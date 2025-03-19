import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  orderId: String,
  payerEmail: String,
  payerName: String,
  amount: String,
  currency: String,
  status: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

export const Payment = model("Payment", paymentSchema);
