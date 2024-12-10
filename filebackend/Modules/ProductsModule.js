// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     preview: { type: String },  // Path to product image
//     sold: { type: Number, default: 0 },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   }, { timestamps: true });
  
//   const Product = mongoose.model('Product', productSchema);
  
//   export default Product;

// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   preview: { type: String },
//   price: { type: Number, required: true },
//   sold: { type: Number, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
// }, { timestamps: true });

// const Product = mongoose.model('Product', productSchema);

// export default Product;

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sold: { type: Number, required: true },
  preview: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Product = mongoose.model('Product', productSchema);
export default Product;