import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    console.log("Connected DB:", conn.connection.name);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
