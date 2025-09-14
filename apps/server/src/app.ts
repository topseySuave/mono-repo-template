import express, { Express } from 'express'
import cors from 'cors'
import { modules } from './modules'
import { errorHandler } from './common/middleware'

export function createApp(): Express {
  const app = express()

  // Global middleware
  app.use(cors())
  app.use(express.json())

  // Health check
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  // Register module routers under their base paths
  for (const { basePath, router } of modules) {
    app.use(basePath, router)
  }

  // Error handler should be last
  app.use(errorHandler)

  return app
}


