import express from 'express'
import cors from 'cors'
import * as UsersRouter from "./routes/users.routes"
import errorHandler from './middlewares/error-handler.middleware'


export const createApp = () => {
  const app = express()

  // APP CONFIGURATION
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  // ROUTE CONFIGURATION
  app.use('/', UsersRouter.router)

  // ERROR HANDLERS CONFIGURATION
  app.use(errorHandler)

  return app
}