import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { sign,verify,decode } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    Jwt_Secret:string
  }
}>()

app.use(cors())

app.route('/api/v1/user',userRouter)

app.route('/api/v1/blog',blogRouter)

app.get("/",(c)=>{
  return c.text("Working fine")
})

export default app
