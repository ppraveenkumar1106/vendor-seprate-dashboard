import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true  },
  item: { type: String, required: true, },
  issueDate: { type: String, required: true, },
  dueDate: { type: String, required: true, },
  total: { type: String, required: true, },
  status: { type: String, enum: ['Paid', 'Due', 'Canceled'], required: true, },
});

const Transactions = mongoose.model('Transactions', transactionSchema);

export default Transactions
