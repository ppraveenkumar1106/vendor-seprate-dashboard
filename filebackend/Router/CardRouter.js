import express from 'express';
import { getCard,
       getcardById,
       createCard,
       updateCard,
       deleteCard } from '../Controller/CardController.js';

const router = express.Router();

// routes for cards

router.get('/cards', getCard);                // Get all cards
router.get('/cards/:id', getcardById);        // Get a single card by ID
router.post('/cards', createCard);            // Create a new card
router.put('/cards/:id', updateCard);         // Update a card by ID
router.delete('/cards/:id', deleteCard);      

export default router;