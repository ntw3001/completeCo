import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser());

// cors config
app.use(cors({
  origin: process.env.CORS_ORIGIN.split(',') || "http://localhost:3001",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedGHeaders: ['Content-Type', 'Authorization'],
}));

//import routes

import healthCheckRouter from './src/routes/healthcheck.routes.js';
import authRouter from './src/routes/auth.routes.js';

//use routes
app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('alright alright yes I\'m here')
})

export default app;
