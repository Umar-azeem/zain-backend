const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middlewares/upload');
const cloudinary = require('../config/cloudinary');

// Create product
router.post('/', upload.array('image'), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      gender,
      colors,
      sizes
    } = req.body;

    const imageUrls = req.files.map(file => file.path);

    const product = new Product({
      name,
      description,
      price,
      category,
      gender,
      colors: colors.split(','),
      sizes: sizes.split(','),
      images: imageUrls
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product by ID (with optional image replacement)
router.put('/:id', upload.array('image'), async (req, res) => {
  try {
    const { name, description, price, category, gender, colors, sizes } = req.body;
    const imageUrls = req.files?.map(file => file.path) || [];

    const updatedData = {
      name,
      description,
      price,
      category,
      gender,
      colors: colors ? colors.split(',') : [],
      sizes: sizes ? sizes.split(',') : [],
    };

    // Only replace images if new ones are uploaded
    if (imageUrls.length > 0) {
      updatedData.images = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
