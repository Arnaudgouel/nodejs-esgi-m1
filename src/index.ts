import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'

import flippers from './routes/flippers'
import brands from './routes/brands'

const app = new Hono()
await DbConnect()

const port = 3000
console.log(`Server is running on port ${port}`)

// 3000/api/creations/
app.route('/api', flippers)
app.route('/api', brands)

app.use("*",(c)=>{
  return c.json({msg:'404 oups'})
});

serve({
  fetch: app.fetch,
  port
})
