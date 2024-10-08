import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import helmet from "helmet";
import infoTexts from "./routes/infoTexts.js";
import contactInfos from "./routes/contactInfos.js";
import adminLogin from "./routes/adminLogin.js";
import cookieParser from 'cookie-parser';
import auth from "./routes/auth.js";
import sectionImages from "./routes/sectionImages.js";
import posts from "./routes/posts.js";
import donations from "./routes/donations.js"
import authMidd from "./middleware/auth.js";
import './config.js'

// Using express
const app = express();
app.use(helmet());
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

// Auth middleware 
app.post('/api/*', authMidd);
app.put('/api/*', authMidd);
app.delete('/api/*', authMidd);
app.get('/api/donations*', authMidd);

// App endpoints
app.use('/api/infoTexts', infoTexts);
app.use('/api/contactInfos', contactInfos);
app.use('/admins/login', adminLogin);
app.use('/api/sectionImages', sectionImages);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/donations', donations);

// Serve static files
app.use('/images', express.static('images'), );

const server = http.createServer(app);

// Connecting to database
const uri = process.env.DB_URI;
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error(error);
    }
}
connect();

// Starting server
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server running in port ${port}`);
})