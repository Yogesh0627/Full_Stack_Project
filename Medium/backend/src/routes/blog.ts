import { Hono } from "hono"

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { sign,verify,decode } from 'hono/jwt'
import { blogInput, updateInput } from "@yogesh0627/medium-common"

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      Jwt_Secret:string
    },
    Variables:{
      userId:string
    }
  }>()

blogRouter.use('/*',async (c,next)=>{
  
  const tokenString = c.req.header('authorization') || ""
  if((!tokenString?.startsWith("Bearer")) || !tokenString){
    return c.text("Not Authorized")
  }
  const tokenArray = tokenString?.split(" ")
  const token = tokenArray[1]

  const decodedValue = await verify(token,c.env.Jwt_Secret)
  if (!decodedValue){
    return c.text("You are not logged in")
  }
  c.set("userId",decodedValue.id)  
  return await next()
})

  blogRouter.post('/',async (c)=>{
    const userId=c.get('userId')
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const {success} = blogInput.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"please enter correct SignIn input"})
    }
    const result = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })

    if(!result){
        return c.json({status:false,msg:"Not Posted"})
    }

    return c.json({status:true,msg:"posted successfully",result})
  })
  
  
  blogRouter.put('/update',async(c)=>{
    const userId = c.get("userId")
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const {success} = updateInput.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"please enter correct SignIn input"})
    }
    const result = await prisma.post.update({
        where:{
            id:body.id
        },data:{
            title:body.title,
            content:body.content
        }
    })
    if (!result){
        return c.json({status:false,msg:"Not updated"})
    }
    return c.json({status:true,msg:"updated Sucessfully",result})
  })

  // / todo add Pagination
  blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const result = await prisma.post.findMany({
      select:{
        content : true,
        title : true,
        id : true,
        author:{
          select : {
            name : true
          }
        }
      }
    })
    if(!result){
        return c.json({status:false,msg:"failed to get bulk"})
    }
    return c.json({status:true,msg:"fetched succesfully",result})
  })
  
  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id')
    const result = await prisma.post.findUnique({
        where:{
            id:id
        },
        select:{
          content : true,
          title : true,
          id : true,
          author:{
            select : {
              name : true
            }
          }
        }
    })

    if(!result){
        return c.json({status:false,msg:"failed to get blog"})
    }
    return c.json({status:true,msg:"fetched succesfully",result})
  })
  

  blogRouter.get('/', (c) => {
  
  
    return c.text('Hello Hono!')
  })