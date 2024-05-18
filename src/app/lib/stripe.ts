/*import {PlANS} from '@/config/stripe'
import { db } from '../models/file'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/dist/types/server'
import Stripe from 'stripe'
import { PLANS } from '../../config/stripe'
import { boolean } from 'zod'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '',{
    apiVersion: '2024-04-16',
    typescript: true,
})
export async function getUserSubscriptionPlan(){
    const {getUser} = getKindeServerSession()
    const user = getUser()

    if (!user.id){
        return {
            ...PLANS[0],
            isSubscribed:false,
            isCanceled:false,
            stripeCurrentPeriodEnd:null,
        }
    }
    const dbUser = await db.user.findFirst({
        where:{
            id:user.id,
        },
    })
    if (!dbUser){
        return{
            ...PLANS[0],
            isSubscribed:false,
            isCanceled:false,
            stripeCurrentPeriodEnd:null,
        }
    }
    const isSubscribed = boolean(
        dbUser.stripePriceId &&
        dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
        dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 //> Date.now()
    )

    const plan = isSubscribed
    ? PLANS.find((plan) => plan.price.priceIds.test === dbUser.stripePriceId)
    : null

    let isCanceled = false
    if(isSubscribed && dbUser.stripeSubscriptionId){
        const stripePlan = await stripe.subscriptions.retrieve(
            dbUser.stripeSubscriptionId
        )
        isCanceled = stripePlan.cancel_at_period_end
    }

    return{
        ...plan,
        stripeSubscriptionId:dbUser.stripeSubscriptionId,
        stripeCurrentPeriodEnd:dbUser.stripeCurrentPeriodEnd,
        stripeCustomerId:dbUser.stripeCustomerId,
        isSubscribed,
        isCanceled,
    }
}*/


import Stripe from 'stripe';
import { PLANS } from '../../config/stripe';
import userModel from '../models/userModel';

// Initialise le client Stripe avec la clé secrète
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2024-04-10',
    typescript: true,
});

// Fonction pour récupérer le plan d'abonnement de l'utilisateur
export async function getUserSubscriptionPlan(user) {
    // Vérifie si l'utilisateur est connecté
    if (!user || !user.id) {
        return {
            ...PLANS[0],
            isSubscribed: false,
            isCanceled: false,
            stripeCurrentPeriodEnd: null,
        };
    }

    // Vérifie dans la base de données si l'utilisateur existe
    const dbUser = await findUserInDatabase(user.id);

    // Si l'utilisateur n'existe pas dans la base de données, retourne le plan par défaut
    if (!dbUser) {
        return {
            ...PLANS[0],
            isSubscribed: false,
            isCanceled: false,
            stripeCurrentPeriodEnd: null,
        };
    }

    // Vérifie si l'utilisateur est abonné
    const isSubscribed =
        dbUser.stripePriceId &&
        dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 jour
        dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

    // Trouve le plan d'abonnement correspondant dans la liste des plans
    const plan = isSubscribed
        ? PLANS.find((plan) => plan.price.priceIds.test === dbUser.stripePriceId)
        : null;

    let isCanceled = false;
    // Vérifie si l'abonnement est annulé
    if (isSubscribed && dbUser.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(
            dbUser.stripeSubscriptionId
        );
        isCanceled = stripePlan.cancel_at_period_end;
    }

    return {
        ...plan,
        stripeSubscriptionId: dbUser.stripeSubscriptionId,
        stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
        stripeCustomerId: dbUser.stripeCustomerId,
        isSubscribed,
        isCanceled,
    };
}

// Fonction pour rechercher un utilisateur dans la base de données MongoDB par son ID
async function findUserInDatabase(userId) {
    try {
        // Utilisez la méthode findOne de votre modèle d'utilisateur pour rechercher l'utilisateur
        const dbUser = await userModel.findOne({ id: userId }).exec();
        return dbUser;
    } catch (error) {
        console.error("Error finding user in database:", error);
        return null; // En cas d'erreur, retournez null
    }
}
