import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import { dbConnect } from "./utils/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://detoxifi.netlify.app", "https://detoxifi.com", "https://www.detoxifi.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
dbConnect();

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/problems", problemRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server running on port ${port}!`));
