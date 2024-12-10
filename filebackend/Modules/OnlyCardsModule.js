import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const OnlyCardsSchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const OnlyCards = mongoose.model('OnlyCard', OnlyCardsSchema);

export default OnlyCards; 
