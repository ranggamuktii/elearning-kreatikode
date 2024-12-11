import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import connectDB from './config/mongodb.js';

dotenv.config();
const app = express();
const port = process.env.PORT;


// Koneksi Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rute API
app.use('/api', routes); // Prefix '/api' untuk semua route

// Jalankan server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
