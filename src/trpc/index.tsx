"use client"
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { useAuth } from './AuthContext';
import { z } from 'zod';
import UserModel, { UserDocument } from '../app/models/userModel';
import { getFileByKey, deleteFileById, getUserFiles } from './fileService';
//import db from '../db'; // Assurez-vous que le chemin est correct
import fileModel, { where } from "../app/models/file";
import { INFINITE_QUERY_LIMIT } from '../config/infinite-query';
import { absoluteUrl } from '../app/lib/utils';
import {  stripe } from '../app/lib/stripe';
import { PLANS } from '../config/stripe';
import user from '../app/models/user';
import { getUserSubscriptionPlan } from "../app/lib/stripe"



const  db = require('../db'); // Assurez-vous que le chemin est correct

// Importez les modèles File et Message de db
const { File, Message } = db

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = useAuth();
    const authenticatedUser = await getUser();
    if (!authenticatedUser?.id || !authenticatedUser?.email) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    let dbUser: UserDocument | null = null;
    try {
      dbUser = await UserModel.findOne({ id: authenticatedUser.id });
      if (!dbUser) {
        dbUser = await UserModel.create({
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          // Ajoutez d'autres champs si nécessaire
        });
      }
    } catch (error) {
      console.error('Error while querying/creating user:', error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to process user data' });
    }

    return { success: true };
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return await getUserFiles(userId);
  }),

  createStripeSession:privateProcedure.mutation(async({ctx})=>{
    const {userId} = ctx
    const billingUrl = absoluteUrl("/dashboard/billing")

    if(!userId) throw new TRPCError({code: "UNAUTHORIZED"})

      const dbUser = await db.user.findFirst({
        where:{
          id:userId
        }
      })
      if(!dbUser) throw new TRPCError({code: "UNAUTHORIZED"})

        const subscriptionPlan = 
        await  getUsersubscriptionPlan()
        if(subscriptionPlan.isSubscribed && dbUser.stripeCustomerId){
          const stripeSession = await stripe.billingPortal.sessions.create({
            customer:dbUser.stripeCustomerId,
            return_url: billingUrl
          })

          return { url: stripeSession.url}
        }
        const stripeSession = await stripe.checkout.sessions.create({
          success_url:billingUrl,
          cancel_url:billingUrl,
          payment_method_types: ["card", "paypal"],
          mode:"subscription",
          billing_address_collection:"auto",
          line_items:[
            {
              price:PLANS.find(
                (plan)=> plan.name === "pro"
              )?.price.priceIds.test,
              quantity:1
            }
          ],
          metadata:{
            userId:userId,
          },
        })

        return { url: stripeSession.url}
  }),


  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { fileId, cursor } = input;
      const limit = input.limit ?? INFINITE_QUERY_LIMIT;

      const file = await db.File.findOne({
        id: fileId,
        userId
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      const messages = await db.Message.find({
        take: limit + 1,
        where:{
          fileId
        },
        orderBy:{
          createdAt:"desc"
        },
        cursor: cursor ? {id:cursor} : undefined,
        select:{
          id:true,
          isUserMessage:true,
          createdAt:true,
          text:true

        }
      })
      let nextCursor:typeof cursor | undefined = undefined
      if(message.length > limit){
        const nextItem = messages.pop()
        nextCursor = nextItem?.id
      }
      return{
        messages,
        nextCursor,
      }
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const foundFile = await fileModel.findOne({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      });

      if (!foundFile) {
        return { status: "PENDING" };
      }

      return { status: "FOUND", file: foundFile };
    }),
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      return await getFileByKey(userId, input.key);
    }),
  deleteFile: privateProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      return await deleteFileById(userId, input.id);
    }),
});

export type AppRouter = typeof appRouter;
