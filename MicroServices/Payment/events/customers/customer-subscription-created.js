import { plans, stripe } from "../../stripe.js";
import { Subscriber } from "../../models/subscriber.js";
import { Order, OrderStatus } from "../../models/order.js";
export const subscriptionCreatedEvent = async (
  event
) => {
  const subscription = await stripe.subscriptions.retrieve(
    event.data.object.id
  );
  const stripeId = subscription.customer;
  const priceId = subscription.items.data[0].plan.id;
  const plan = plans.find((p) => p.priceId === priceId);
  const customer = await stripe.customers.retrieve(stripeId);
  let user;

  if (!customer.deleted) {
    user = await Subscriber.findOne({ stripeId: stripeId });
    if (user) throw Error("user Already subscribed");
    const newOrder = Order.build({
      price: plan.price,
      status: OrderStatus.Pending,
    });
    await newOrder.save();

    user = Subscriber.build({
      stripeId,
      orderId: newOrder.id,
      subscription: plan.type,
    });

    

    await user.save();
    
  } else {
    throw new Error("No user Found");
  }
};