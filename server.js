import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json())//to send json data in req/res
app.use(morgan('dev'))

// routes
app.use("/api/v1/auth", authRoutes);

// rest api (request handling and api response send to user) '/' => for "HOME"
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Bhagwati Chemicals</h1>")
});

// PORT (React = 3000, Angular = 4200, Node = 8000/8080) must be an empty port
const PORT = process.env.PORT || 8080;

// RUN listen | '() => {}' is callback function | To run in terminal use either "node server.js" or "npm start" from package.json file
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);//For making the statement dynamic we use backtick;"``" | "${PORT}" used template literal(${}) to show PORT number 
});
