import { stripe } from "../../stripe.js";
import { Subscriber, SubscriptionType } from "../../models/subscriber.js";
import { Order, OrderStatus } from "../../models/order.js";

export const subscriptionDeletedEvent = async (
  event
) => {
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.id
  );
  const stripeId = subscription.customer;
  const customer = (await stripe.customers.retrieve(
    stripeId
  ));
  if (!customer) throw Error("cant find customer");
  if (subscription.status !== "active") {
    let user = await Subscriber.findOne({ stripeId: stripeId });
    if (!user) throw Error("cant find user");
    user.subscription = SubscriptionType.EXPIRED;
    const order = await Order.findById({ _id: user.orderId });
    if (!order) throw Error("cant find order {Delete}");
    order.status = OrderStatus.Canceled;
    await user.save();
    await order.save();
  } else {
    throw Error("subscription is active");
  }
};