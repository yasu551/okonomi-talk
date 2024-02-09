import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { createApp } from 'honox/server'

const app = createApp()
app.use(logger())
showRoutes(app)

export default app
