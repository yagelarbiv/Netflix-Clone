import { PayPalService } from "../services/paypal-service.js";
import { SubscriptionService } from "../services/subscription-service.js";


export class PayPalController {
  paypalService;
  subscriptionService;
  constructor(
    paypalService = new PayPalService(),
    subscriptionService = new SubscriptionService()
  ) {
    this.paypalService = paypalService;
    this.subscriptionService = subscriptionService;
  }

  createPayPalOrder = async (req, res)=> {
    const { selectedPlan, PlanPrice, userId } = req.body;
    console.log(selectedPlan, PlanPrice, userId);
    const order = await this.paypalService.createOrder(
      selectedPlan,
      Number(PlanPrice)
    );
    console.log(order);
    const subscription = {
      userId,
      orderId: order.id,
      subscription: selectedPlan,
      subscriptionPrice: Number(PlanPrice),
    };

    await this.subscriptionService.createSubscription(subscription);

    res.json(order);
  };

  capturePayPalOrder = async (req, res) => {
    const { orderID, selectedPlan, PlanPrice } =
      req.body;
    console.log(orderID);
    const captureData = await this.paypalService.captureOrder(orderID);

    if (captureData.status === "COMPLETED") {
      await this.subscriptionService.updateSubscription(orderID, selectedPlan);
    }

    res.json(captureData);
  };
}