import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './app/routers/index.js';
import multer from 'multer';


dotenv.config();

const app = express();

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  credentials: true, // Active l'envoi de cookies lors des requêtes cross-origin
};

app.use(cors(corsOptions));

app.use('/public', express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🟢 API server listening on ${port} @ http://localhost:${port}`);
});
