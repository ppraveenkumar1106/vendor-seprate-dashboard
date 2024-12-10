import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import Overview from './Modules/OverviewModules.js';
import Product from './Modules/ProductsModule.js';
import OverviewRouter from './Router/OverviewRouter.js';
import ProductsRouter from './Router/ProductsRouter.js';
import SettingAuthRoutes from './Router/settingAuthRouter.js';
import data from './data.js'; 
import User from './Modules/settingAuthModules.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
    cors({
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  

app.use(express.json()); 

const seedDatabase = async () => {
    try {
        await Promise.all([
            Overview.deleteMany({}),
            Product.deleteMany({ id: null }),
            User.deleteMany({}),
        ]);

        await Promise.all([
            Overview.insertMany(data.overview),
            ...data.products.map(product => 
                Product.updateOne({ id: product.id }, { $set: product }, { upsert: true })
            ),
            User.insertMany(data.Users)
        ]);

        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error inserting seed data:", error);
    }
};

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dash', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('MongoDB connected');

        if (process.env.SEED_DB === 'true') {
            await seedDatabase();
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

connectToDatabase();

app.use('/api/data', OverviewRouter);
app.use('/api/data', ProductsRouter);
app.use('/api/auth', SettingAuthRoutes); 


app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(err.status || 500).json({ error: err.message || 'An unexpected error occurred.' });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
