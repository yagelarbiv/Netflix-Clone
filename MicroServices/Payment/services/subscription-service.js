import SubscriptionPayPal from "../models/subscription-paypal.js";


export class SubscriptionService {

    async createSubscription(subscription) {
        const newSubscription = new SubscriptionPayPal(subscription);
        await newSubscription.save();
    }

    async updateSubscription(orderId, subscription) {
        await SubscriptionPayPal.findOneAndUpdate(
            { orderId },
            { subscription },
            { new: true });
    }
}