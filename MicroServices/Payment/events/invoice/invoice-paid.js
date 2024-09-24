import { stripe } from "../../stripe.js";
import { Subscriber } from "../../models/subscriber.js";
import { Order, OrderStatus } from "../../models/order.js";

export const invoicePaidEvent = async (event) => {
  const invoice = await stripe.invoices.retrieve(event.data.object.id);
  const stripeId = invoice.customer;
  const customer = (await stripe.customers.retrieve(
    stripeId
  ));
  if (!customer) throw Error("cant find customer");
  const user = await Subscriber.findOne({ stripeId });
  if (!user) throw Error("cant find user");
  const order = await Order.findOne({ _id: user.orderId });
  if (!order) throw Error("cant find order");
  order.status = OrderStatus.Completed;
  await order.save();
};