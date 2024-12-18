import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import connectDB from './config/mongodb.js';
// import mongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit'

dotenv.config();
const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
})

// Koneksi Database
connectDB();

app.use(cors());
app.use(express.json());

// app.use(mongoSanitize());
app.use(limiter)

app.use('/api/thumbnail', express.static('public/thumbnail'));
app.use('/api', routes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

export default app;
