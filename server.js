import express from 'express';
import mongoClient from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path'; 
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv"; 

import shipping from './routes/shippingRoute.js';
import users from './routes/userRoute.js';
import ai from './routes/aiRoute.js';

dotenv.config();

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
//Body-parser Middleware
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;
const mongiDbName = process.env.MONGO_DB_NAME

// DB Config
const dataBase = `${mongoUri}/${mongiDbName}`;

// Connect to Mongo DB
// mongoClient.connect(dataBase) 
//   .then(() => console.log(`Connected to MongoDB ${dataBase}`))
//   .catch(err => console.log(err));

// Route Files
app.use('/api/v1', shipping);
app.use('/api/v1', users);
app.use ('/api/v1', ai);

const port = process.env.PORT || 3000;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start Server
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
