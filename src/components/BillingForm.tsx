"use client"

import Card from "antd/es/card/Card"
import { useToast } from "../../@/components/ui/use-toast"
import { trpc } from "../app/_trpc/client"
import { getUserSubscriptionPlan } from "../app/lib/stripe"
import MaxWidthWrapper from "./maxWidthWrapper"
import { CardDescription, CardFooter, CardHeader, CardTitle } from "../../@/components/ui/card"
import Button from "./ui/Button"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

interface BillingFormProps{
    subscriptionPlan: Awaited<
    ReturnType<typeof getUserSubscriptionPlan>>
}

const BillingForm = ({
    subscriptionPlan, 
}: BillingFormProps) =>{
    const {toast} = useToast()

    const{mutate: createStripeSession,isLoading} = trpc.createStripeSession.useMutation({
        onSuccess:({url}) =>{
            if(url) window.location.href = url
            if(!url){
                toast({
                    title:'there was a problem...',
                    description: 'please try again in a moment',
                    variant:"destructive"
                })
            }
        },
    })
    return <MaxWidthWrapper className="maw-w-5xl">
        <form className="mt-12" onSubmit={(e)=>{
            e.preventDefault()
            createStripeSession()
        }}>
           <Card>
            <CardHeader>
                <CardTitle>subscription plan</CardTitle>
                <CardDescription>
                    you are currently on the{' '}
                    <strong>{subscriptionPlan.name}</strong>plan.
                </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-colitems-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                <Button type='submit'>
                    {isLoading ? (
                        <Loader2 className="mr-4 h-4 w-4 animate-spin"/>
                    ) :null}
                    {subscriptionPlan.isSubscribed 
                    ? "Manage subscription"
                    : "upgrade to PRO"}
                </Button>

                {subscriptionPlan.isSubscribed ?(
                    <p className="rounded-full text-xs font-medium">
                        {subscriptionPlan.isCanceled ? "your plan willbe canceled on "
                        :'your plan renews on'}
                        {format(subscriptionPlan.stripeCurrentPeriodEnd!,
                            "dd.MM.yyyy"
                            )}
                            .
                    </p>
                ) :null}
            </CardFooter>
           </Card>
        </form>
    </MaxWidthWrapper>

}

export default BillingForm