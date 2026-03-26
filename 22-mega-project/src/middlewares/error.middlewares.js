import mongoose from "mongoose"
import { ApiError } from "../utils/apiError.js"

const errorHandler = (err, req, res, next) => {
  let error = err

  console.log("RAW ERROR:", err)
  console.log("ERROR.MESSAGE:", err.message)
  console.log("ERROR.STACK:", err.stack)

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500)

    const message = error.message || "Something went wrong"
    error = new ApiError(statusCode, message, error?.errors || [], err.stack)
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
  }

  return res.status(error.statusCode || 500).json(response)
}

export default errorHandler
