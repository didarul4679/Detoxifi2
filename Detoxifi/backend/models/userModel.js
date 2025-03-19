import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    resetCode: String,
    resetCodeExpires: Date,
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    paymentToken: { type: String, default: null },
    problems: [
      {
        problemId: {
          type: Schema.Types.ObjectId,
          ref: "Problem",
        },
        name: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
