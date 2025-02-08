import express from 'express'
import cors from 'cors'

export const createApp = () => {
  const app = express()

  // APP CONFIGURATION
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  // ROUTE CONFIGURATION
  // app.use('/', router)

  return app
}