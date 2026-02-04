const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

// 👇 FORCE absolute path
dotenv.config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FarmFreshHub API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
