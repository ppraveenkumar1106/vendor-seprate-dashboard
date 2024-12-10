


import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { authenticate } from '../middleware/AuthMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Controller/ProductsController.js';
import Product from '../Modules/ProductsModule.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', 'dash', 'public', 'assets');

    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
        return cb(err);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueName);
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
    cb(null, true);
  }
});


router.get('/products/images/:filename', authenticate, (req, res) => {
  const imageName = req.params.filename;
  const imagePath = path.join(__dirname, '..', '..', 'dash', 'public', 'assets', imageName);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${imagePath}`);
      return res.status(404).send('Image not found');
    }
    res.sendFile(imagePath);
  });
});


router.post('/products', authenticate, upload.single('preview'), async (req, res) => {
  try {

    const { name, price, sold } = req.body;
    const preview = req.file ? `/assets/${req.file.filename}` : '';
   
    if (!name || !price || !sold) {
      console.error('Validation Error: Missing fields');
      return res.status(400).json({ message: 'All fields are required.' });
    }

    
    const product = new Product({
      name,
      price,
      sold,
      preview,
      userId: req.user.id, 
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error); 
    res.status(500).json({ message: 'Failed to create product.', error });
  }
});







router.get('/products', authenticate, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
});


router.get('/products/:id', authenticate, getProductById);




router.put('/products/:id', authenticate, upload.single('preview'), async (req, res) => {
  const { id } = req.params;  
  const updateData = req.body; 


  if (req.file) {
    updateData.preview = req.file.path;
  }

  try {
    console.log('Product ID:', id);

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or invalid ID' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});




router.delete('/products/:id', authenticate, async (req, res) => {
  try {
   
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,   
      userId: req.user.id,     
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found or you do not have access to it.' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product. Please try again.' });
  }
});

export default router;
