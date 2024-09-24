import mongoose from "mongoose";

const OrderStatus = {
  Pending: "Pending",
  Completed: "Completed",
  Failed: "Failed",
  Canceled: "Canceled",
};

const orderSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
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

orderSchema.statics.build = (attrs) => {
  return new Order({
    price: attrs.price,
    status: attrs.status,
  });
};

const Order = mongoose.model("Order", orderSchema);

export { Order, OrderStatus };