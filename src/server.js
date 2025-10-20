import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import supplyRoutes from "./routes/supplyRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import detailTransactionRoutes from "./routes/detailTransactionRoutes.js"
import fsnRoutes from "./routes/fsnRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

// initialize dotenv
dotenv.config();

// initialize express app
const app = express();

// retrive port from dotenv
const port = process.env.APP_PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", userRoutes);
app.use("/products", productRoutes);
app.use("/supply", supplyRoutes);
app.use("/transactions", transactionRoutes);
app.use("/detail-transactions", detailTransactionRoutes);
app.use("/payment", paymentRoutes);
app.use("/fsn", fsnRoutes);

app.use(errorHandler);

// server running
app.listen(port, () => {
  console.log(`Database connected on port:${port}...✅`);
});
