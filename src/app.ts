import express from 'express'
import cors from 'cors'
import * as UsersRouter from "./routes/users.routes"


export const createApp = () => {
  const app = express()

  // APP CONFIGURATION
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  // ROUTE CONFIGURATION
  app.use('/', UsersRouter.router)

  return app
}