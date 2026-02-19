import express from 'express';
import cors from 'cors';
import router from './routes/healthcheck.routes.js';

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }),
)

// middleware
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"

//routes
app.use("/api/v1/healthcheck", healthcheckRouter)

export { app };
