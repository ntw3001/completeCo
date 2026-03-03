import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"

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
app.use(cookieParser)

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"

//routes
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/user", userRouter)

export { app };
