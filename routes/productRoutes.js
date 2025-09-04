const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");

// CREATE Product
router.post("/", upload.array("image", 5), async (req, res) => {
  try {
    console.log("Files received:", req.files);
    console.log("Body:", req.body);

    const { name, description, price, category, gender, colors, sizes } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and Price are required" });
    }

    // ✅ Upload files to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        imageUrls.push(result.secure_url);
      }
    }

    // ✅ Handle colors & sizes (string OR array dono chalega)
    const product = new Product({
      name,
      description,
      price,
      category,
      gender,
      colors: Array.isArray(colors) ? colors : colors ? colors.split(",") : [],
      sizes: Array.isArray(sizes) ? sizes : sizes ? sizes.split(",") : [],
      images: imageUrls,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product by ID
router.put("/:id", upload.array("image", 5), async (req, res) => {
  try {
    const { name, description, price, category, gender, colors, sizes } = req.body;

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        imageUrls.push(result.secure_url);
      }
    }

    const updatedData = {
      name,
      description,
      price,
      category,
      gender,
      colors: Array.isArray(colors) ? colors : colors ? colors.split(",") : [],
      sizes: Array.isArray(sizes) ? sizes : sizes ? sizes.split(",") : [],
    };

    if (imageUrls.length > 0) {
      updatedData.images = imageUrls; // replace only if new images uploaded
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
