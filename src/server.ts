import express, { Request, Response } from "express"

import "express-async-errors"
import { AppError } from "./erros/AppError"
import { router } from "./routes"

const app = express()

app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }
  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err.message}`,
  })
})

app.listen(3333, () => console.log("🚀 Server running at port 3333"))
