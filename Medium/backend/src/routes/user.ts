import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signInBody, signUpBody } from '@yogesh0627/medium-common'
import { sign,verify,decode } from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      Jwt_Secret:string
    },
    Variables:{
      userId:string
    }
  }>()

 /* 

  auth middleware
  userRouter.use('/details',async (c,next)=>{
  
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
*/

  userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
  
    const {success} = signUpBody.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"please enter correct input"})
    }
    try {
      const result = await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        }
      })
      
      const token = await sign({email:result.email,id:result.id},c.env.Jwt_Secret)
      
      if(!result){
        return c.json({status:false,result,token, msg:"Sign up failed"})  
      }
      console.log(result)
      console.log("token is :-",token)
      return c.json({status:true,result,token,msg:"Sign up sucessfully"})
    } catch (error) {
      return c.json({status:false, msg:"Some Error Occurred",error})
    }
  })
  
  
  userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = signInBody.safeParse(body)
    if (!success){
      return c.json({status:false,msg:"please enter correct SignIn input"})
    }
    try { 
      const result = await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
    
      if (!result){
         c.status(403) 
        return c.json({status:false,msg:"user doesn't exist"})
      }

      const token = await sign({email:result.email,id:result.id},c.env.Jwt_Secret)
      return c.json({status:true,msg:"Signin Successfully",result,token})
    } catch (error) {
      return c.json({status:false, msg:"Some Error Occurred"})
    }
  })
  
  userRouter.delete("/delete",async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const ack = await prisma.user.deleteMany()
    console.log(ack)
    return c.text("done")
  })

/*
  for getting all the details of the user

  userRouter.get("/details",async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const userId = c.get("userId")
      console.log(userId,"from router.get")

    try {
      
      
      const result = await prisma.user.findUnique({
        where:{
          id:userId
        },select:{
          id:true,
          name:true,
          password:true,
          email:true,
          posts:true
        }
      })

      if (result){
        return c.json({status:true,msg:"User Found",result})
      }
      else{return c.json({status:false, msg:"user not found"})}
    } catch (error) {
     return c.json({status:false,msg:"Some Error Occured"}) 
    }
  })

*/