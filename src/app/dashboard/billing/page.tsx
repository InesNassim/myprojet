
import BillingForm from "../../../components/BillingForm";
import { getUserSubscriptionPlan } from "../../lib/stripe"

const page = async () =>{
const userId= 123;
    const subscriptionPlan = await getUserSubscriptionPlan(userId);
    return <BillingForm subscriptionPlan ={subscriptionPlan }/>
}
export default page