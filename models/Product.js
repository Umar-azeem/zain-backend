const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    category: String,
    gender: String,
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
