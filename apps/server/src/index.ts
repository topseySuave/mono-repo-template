import dotenv from 'dotenv'
import { createApp } from './app'

dotenv.config()

const port = Number(process.env.PORT) || 4000
const app = createApp()

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${port}`)
})


