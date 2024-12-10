import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getOnlyCards,
  getOnlyCardById,
  createOnlyCard,
  updateOnlyCard,
  deleteOnlyCard,
} from '../Controller/OnlyCardsController.js'; // Adjust the path as necessary
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload path for the images
    const uploadPath = path.join(__dirname, '..', '..', 'dash', 'public', 'assets'); 

    // Ensure the directory exists
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
        return cb(err);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // Create a unique file name
  },
});

// Initialize multer with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // Limit file size to 1MB (optional)
});

// Handle image access by filename for OnlyCards
router.get('/OnlyCards/images/:filename', (req, res) => {
  const imageName = req.params.filename;
  const imagePath = path.join(__dirname, '..', '..', 'dash', 'public', 'assets', imageName); // Path to the image

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${imagePath}`);
      return res.status(404).send('Image not found');
    }
    res.sendFile(imagePath);
  });
});

// Route to create a new OnlyCard
router.post('/OnlyCards', upload.single('img'), createOnlyCard); // Upload an image and create OnlyCard

// Route to get all OnlyCards
router.get('/OnlyCards', getOnlyCards); // Fetch all OnlyCards

// Route to get a single OnlyCard by ID
router.get('/OnlyCards/:id', getOnlyCardById); // Fetch OnlyCard by ID

// Route to update an OnlyCard by ID
router.put('/OnlyCards/:id', upload.single('img'), updateOnlyCard); // Upload an image and update OnlyCard

// Route to delete an OnlyCard by ID
router.delete('/OnlyCards/:id', deleteOnlyCard);
export default router;
