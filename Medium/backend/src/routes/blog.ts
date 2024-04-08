
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
    return c.text("Not authorized")
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
      return c.json({status:false,msg:"Please enter correct blog inputs"})
    }
    try {
      const result = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId,
            published :true
        }
    })

    if(!result){
        return c.json({status:false,msg:"Not published"})
    }

    return c.json({status:true,msg:"Published successfully",result})
    } catch (error) {
      return c.json({status:false,msg:"Some unknown error occured"})
    }
  })


  blogRouter.post('/save',async (c)=>{
    const userId=c.get('userId')
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const {success} = blogInput.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"Please enter correct blog inputs"})
    }
    try {
      const result = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId,
        }
    })

    if(!result){
        return c.json({status:false,msg:"Not drafted"})
    }
    return c.json({status:true,msg:"Drafted successfully",result})
    } catch (error) {
      return c.json({status:false,msg:"Some unknown error occured"})    }
  })

  blogRouter.put('/save/:blogId',async(c)=>{
    const userId = c.get("userId")
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const blogId = c.req.param("blogId")
    const {success} = updateInput.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"please enter correct blog inputs"})
    }
    try {
      const result = await prisma.post.update({
        where:{
            id:blogId
        },data:{
            title:body.title,
            content:body.content
        }
    })
    if (!result){
        return c.json({status:false,msg:"Not updated"})
    }
    return c.json({status:true,msg:"Updated & drafted Sucessfully",result})
    } catch (error) {
      return c.json({status:false,msg:"Some unknown error occured"})
    }
  })
  
  blogRouter.put('/update/:blogId',async(c)=>{
    const userId = c.get("userId")
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const blogId = c.req.param("blogId")
    const {success} = updateInput.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"Please enter correct blog inputs"})
    }
    try {
      const result = await prisma.post.update({
        where:{
            id:blogId
        },data:{
            title:body.title,
            content:body.content
        }
    })
    if (!result){
        return c.json({status:false,msg:"Not updated"})
    }
    return c.json({status:true,msg:"Updated & published successfully",result})
    } catch (error) {
      return c.json({status:false,msg:"Some unknown error occured"})
    }
  })

  // / todo add Pagination
  blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const result = await prisma.post.findMany({
      where:{
        published:true,
      },
      select:{
        content : true,
        title : true,
        id : true,
        authorId:true,
        author:{
          select : {
            name : true
          }
        }
      }
    })
    if(!result){
        return c.json({status:false,msg:"failed to get blogs"})
    }
    return c.json({status:true,msg:"fetched succesfully",result})
  })

  blogRouter.get('/myblogs', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try {
        const userId = c.get("userId")
        console.log("userId",userId)
        const result = await prisma.post.findMany({
          where:{
            authorId:userId,
            
          },select:{
            content : true,
            title : true,
            id : true,
            authorId:true,
            published:true,
            author:{
              select : {
                name : true,
                
              }
            }
          }
        })
        if (result){
          return c.json({status:true, msg:"Succesfully fetched all blogs of user" , result})
        }
        else{
          return c.json({status:false, msg:"No blog exist"})
        }
      } catch (error) {
        return c.json({status:false, msg:"Error while fetching blogs from database"})      
      }


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
          authorId:true,
          published:true,
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
    return c.json({status:true,msg:"Fetched succesfully",result})
  })
  
  blogRouter.delete("/:id",async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try {
        const userId= c.get("userId")
        const blogId = c.req.param('id')
        const ack = await prisma.post.delete({
          where:{
            id:blogId,
            authorId:userId
          }
        })
        if(ack){
          console.log("ack from delete",ack)
          return c.json({status:true,msg:"Blog deleted sucessfully", ack})
        }
        else{
          return c.json({status:false,msg:"Not found", ack})
        }
      } catch (error) {
        return c.json({status:false , msg: "Some error occurred ",})
      }

  })


  // blogRouter.delete("/delete",async (c)=>{
  //   const prisma = new PrismaClient({
  //     datasourceUrl: c.env.DATABASE_URL,
  //     }).$extends(withAccelerate())

  //   const ack = await prisma.post.deleteMany()
  //   console.log(ack)
  //   return c.text("done")
  // })


