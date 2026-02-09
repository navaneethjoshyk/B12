import express from 'express';
import cors from 'cors'; 
import connectDB from './config/db.js';
import user from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

// 1. Connect to Database
connectDB();

// 2. cors MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,                
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. OTHER MIDDLEWARE
app.use(express.json());  
app.use(cookieParser());

// 4. ROUTES
app.use('/users', user);

app.get('/', async (request, response) => {
    response.json("hello")
})

export default app;