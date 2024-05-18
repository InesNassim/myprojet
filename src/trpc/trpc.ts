/*import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/dist/types/server';
import { TRPCError, initTRPC } from '@trpc/server';
 

const t = initTRPC.create();
const middleware=t.middleware

const isAuth =middleware(async(opts)=>{

    const {getUser} = getKindeServerSession()
    const user =getUser()

    if(!user || !(await user).id){
        throw new TRPCError({ code: 'UNAUTHORIZED'})
    }
    return opts.next({
        ctx:{
            userId:(await user).id,
            user,
        },
    })

})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)*/
import { getSession } from 'next-auth/react';
import { TRPCError, initTRPC } from '@trpc/server';

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const { db } = await connectToDatabase();
  const dbUser = await db.collection('users').findOne({ email: session.user.email });

  if (!dbUser) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      userId: session.user.email, // Utilisation de l'email comme identifiant
      user: dbUser,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
function connectToDatabase(): { db: any; } | PromiseLike<{ db: any; }> {
    throw new Error('Function not implemented.');
}

