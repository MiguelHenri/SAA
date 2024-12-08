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
import path from 'path';
import './s3-client.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Using express
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// CORS
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',');
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins?.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

const s3_url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`

// CSP
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy', 
        "default-src 'self'; " +  // Permite conteúdo do mesmo domínio
        `img-src 'self' ${s3_url}; ` + // Permite imagens do próprio domínio e do S3
        "script-src 'self' 'unsafe-eval'; " +  // Permite scripts do próprio domínio e inline scripts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " + // Permite estilos do próprio domínio, inline e Google Fonts
        "font-src 'self' https://fonts.gstatic.com;" // Permite fontes do Google Fonts
    );
    next();
});

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

// Serve frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

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