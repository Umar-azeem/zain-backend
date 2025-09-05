const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://zain-frontend.vercel.app"
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
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Vercel requires export
module.exports = app;














// ✅ Vercel requires: export handler
// module.exports = app;
//  app.listen(PORT, () => {
//    console.log(`✅ Server http://localhost:${PORT} par chal raha hai`);
//  });