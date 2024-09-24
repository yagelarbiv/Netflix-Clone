import { plans, stripe } from "../../stripe.js";
import { Subscriber } from "../../models/subscriber.js";
import { Order } from "../../models/order.js";

export const subscriptionUpdatedEvent = async (
  event
) => {
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.id
  );
  const stripeId = subscription.customer;
  const priceId = subscription.items.data[0].plan.id;
  const plan = plans.find((p) => p.priceId === priceId);

  const customer = (await stripe.customers.retrieve(
    stripeId
  ));
  if (!customer) throw Error("cant find customer");
  const user = await Subscriber.findOne({ stripeId: stripeId });
  if (!user) throw Error("cant find user");
  const order = await Order.findOne({ _id: user.orderId });
  console.log(user, order);
  if (!order) throw Error("cant find order {Updated}");
  user.subscription = plan.type;
  order.price = plan.price;
  await order.save();
  await user.save();
};