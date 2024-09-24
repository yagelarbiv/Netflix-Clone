import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  getPublishKey,
  createSubscription,
} from "../controllers/payment-controller.js";
import { PayPalService } from "../services/paypal-service.js";
import { SubscriptionService } from "../services/subscription-service.js";
import { PayPalController } from "../controllers/paypal-payment-controller.js";

const router = Router();
const paypalService = new PayPalService();
const subscriptionService = new SubscriptionService();
const paypalController = new PayPalController(paypalService, subscriptionService);

router.get("/config", expressAsyncHandler(getPublishKey));
router.post("/create-subscription", expressAsyncHandler(createSubscription));


router.post('/create-paypal-order', expressAsyncHandler(paypalController.createPayPalOrder));
router.post('/capture-paypal-order', expressAsyncHandler(paypalController.capturePayPalOrder));


export default router;