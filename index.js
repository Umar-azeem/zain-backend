const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://abd-woad.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON
app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);

// ✅ MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// ❌ Ye line hata do jab Vercel use karo
// app.listen(5000, () => {
//   console.log(`Server running on port 5000`);
// });

// ✅ Vercel ke liye app ko export karo
module.exports = app;
