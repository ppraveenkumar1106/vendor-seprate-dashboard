import mongoose from 'mongoose';

// Define the card schema
const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  percentage: { type: Number, required: true },
  amount: { type: Number, required: true },
  active: { type: Boolean, required: true },
  color: { type: String, required: true },
});

// Create the card model
const Card = mongoose.model('Card', cardSchema);

export default Card;
