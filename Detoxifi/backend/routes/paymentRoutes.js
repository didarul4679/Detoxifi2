import express from "express";
import {
  completeOrder,
  stripePayment,
} from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to complete an order
router.post("/complete_order", authMiddleware, completeOrder);
router.post("/stripe_payment", authMiddleware, stripePayment);
export default router;
