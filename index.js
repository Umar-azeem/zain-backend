const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
const app = express();

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://abd-woad.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// ✅ Product routes
app.use("/api/products", productRoutes);

// ✅ MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// ❌ Remove app.listen()
// ✅ Export handler for Vercel
module.exports = app;
