import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import commentRoutes from './routes/index.js';


dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api', commentRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

export default app;