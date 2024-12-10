import mongoose from 'mongoose';

const overviewSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  action: { type: String },
  number: { type: String, required: true },
  Edit: { type: String, required: false }, 
});

const Overview = mongoose.model('Overview', overviewSchema);
export default Overview;
