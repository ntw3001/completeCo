import express from 'express';
import cors from 'cors';

const app = express()

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))

// cors config
app.use(cors({
  origin: process.env.CORS_ORIGIN.split(',') || "http://localhost:3001",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedGHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
  res.send('alright alright yes I\'m here')
})

export default app;
