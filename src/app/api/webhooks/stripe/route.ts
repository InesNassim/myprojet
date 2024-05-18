import { stripe } from "../../../lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";
import db from "../../../../db";


export async function POST(request:Request){
    const body = await request.text()
    const signature = headers().get('stripe-signature')?? ''
    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''

        )
    }catch(err){
        return new Response(
            `webhook Error: ${
                err instanceof Error ? err.message : 'Unknown Error'
            }`,
            { status: 400}
        );
        
        
    }
   const session = event.data
   .object as Stripe.Checkout.Session

   if(!session?.metadata?.userId) {
    return new Response(null,{
        status:200,
    })
   }

   if(event.type ==='checkout.session.completed') {
    const subscription =
    await stripe.subscriptions.retrieve(
        session.subscription as string
    )
   }
   if(event.type === 'invoice.payment_succeeded'){
    //Retrieve the subscription details from stripe.
    const subscription=
    await stripe.subscriptions.retrieve(
        session.subscription as string
    )
    await db.User.updateOne({
        where: {
            stripeSubscriptionId: subscription.id,
        },
        data: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        }
    });
    
   }
   if(event.type === 'invoice.payment_succeeded'){
    //Retrieve the subscription details from stripe.
    const subscription=
    await stripe.subscriptions.retrieve(
        session.subscription as string
    )
}
return new Response(null,{ status:200})

}
