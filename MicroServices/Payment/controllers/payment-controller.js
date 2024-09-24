import { ENV_VARS } from "../configurations/envVars.js";
import { plans, stripe } from "../stripe.js";

export const createSubscription = async (req, res) => {
  const { plan, userId } = req.body;

  const customer = await stripe.customers.create({
    name: userId,
    metadata: {
      user_id: userId,
    },
  });
  const priceId = plans.find((p) => p.type === plan).priceId;
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: priceId,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
      payment_method_types: ["card"],
    },
    expand: ["latest_invoice.payment_intent"],
  });

  const latestInvoice = subscription.latest_invoice;
  const paymentIntent = latestInvoice.payment_intent;
  const clientSecret = paymentIntent.client_secret;

  res.send({
    subscriptionId: subscription.id,
    clientSecret: clientSecret,
  });
};
export const getPublishKey = async (req, res) => {
  res.send({
    publishableKey: ENV_VARS.STRIPE_PUBLISHABLE_KEY,
  });
};