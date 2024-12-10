

import { v4 as uuidv4 } from 'uuid';
import Product from '../Modules/ProductsModule.js';
import { authenticate } from '../middleware/AuthMiddleware.js'; 
import multer from 'multer'; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


export const createProduct = async (req, res) => {
  try {
    const userId = req.userId; 
    const { name, price, sold = 0 } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Preview image is required." });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Price must be a valid number." });
    }

    const newProduct = new Product({
      id: uuidv4(),
      name,
      price: parsedPrice,
      sold: parseInt(sold, 10) || 0,
      preview: `/assets/${req.file.filename}`,
      userId, 
    });

   
    const createdProduct = await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: createdProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product.', error: error.message });
  }
};


export const getProducts = [authenticate, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId });  
    res.json(products);  
  } catch (err) {
    res.status(500).json({ error: err.message });  
  }
}];

export const getProductById = [authenticate, async (req, res) => {
  try {
    const userId = req.userId; 
    const product = await Product.findOne({ _id: req.params.id, userId });  

    if (!product) {
      return res.status(404).json({ error: "Product not found or you do not have access to it." });
    }

    res.json(product);
  } catch (err) {
    console.error('Error retrieving product:', err);
    res.status(500).json({ error: "Failed to retrieve product: " + err.message });
  }
}];

export const updateProduct = [
  authenticate,
  async (req, res) => {
    try {
      // console.log('Request body:', req.body);
      // console.log('Product ID:', req.params.id);
      // console.log('Authenticated User ID:', req.user._id);  // Assuming `req.user` has user info after authentication

      const updateData = { ...req.body };

      if (req.file) {
        console.log('Uploaded file path:', req.file.path);
        updateData.preview = req.file.path;  
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id }, 
        updateData,
        { new: true, runValidators: true }
      );


      if (!updatedProduct) {
        return res.status(404).json({
          error: "Product not found or you do not have access to update it.",
        });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error('Error updating product:', err);

      if (err.name === 'ValidationError') {
        return res.status(400).json({
          error: "Invalid data provided.",
          details: err.errors,  
        });
      }

      res.status(500).json({
        error: "Failed to update product.",
        message: err.message,  
      });
    }
  },
];


export const deleteProduct = [
  authenticate, 
  async (req, res) => {
    try {
      const deletedProduct = await Product.findOneAndDelete({
        _id: req.params.id,    
        userId: req.user.id,      
      });

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found or you do not have access to it.' });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (err) {

      console.error('Error deleting product:', err);
      res.status(400).json({ error: 'Failed to delete product. Please try again.' });
    }
  },
];
