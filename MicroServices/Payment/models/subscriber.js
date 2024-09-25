import mongoose from "mongoose";

const SubscriptionType = {
  EXPIRED: "Expired",
  BASIC: "Basic",
  STANDARD: "Standard",
  PREMIUM: "Premium",
};
const SubscriberSchema = new mongoose.Schema(
  {
    stripeId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    subscription: {
      type: String,
      required: true,
      enum: Object.values(SubscriptionType),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
SubscriberSchema.statics.build = (attrs) => {
  return new Subscriber(attrs);
};

const Subscriber = mongoose.model(
  "Subscriber",
  SubscriberSchema
);
export { Subscriber, SubscriptionType };