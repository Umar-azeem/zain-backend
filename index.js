const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
// const PORT = process.env.PORT || 5000;

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: ["http://localhost:3000", "https://abd-woad.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON
app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);

// app.listen(5000, () => {
//   console.log(`Example app listening on port 5000`);
// });
// ✅ MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// ✅ Vercel requires: export handler
module.exports = app;
// app.listen(PORT, () => {
//   console.log(`✅ Server http://localhost:${PORT} par chal raha hai`);
// });