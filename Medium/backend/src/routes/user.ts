import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signInBody, signUpBody } from '@yogesh0627/medium-common'
import { sign,verify,decode } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      Jwt_Secret:string
    }
  }>()

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
      console.log(result)
      console.log("token is :-",token)
      return c.json({status:true,result,token})
    } catch (error) {
      return c.json({msg:"Please Provide Correct Details",error})
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
      return c.json({status:false, msg:"Some Error Occured"})
    }
  })
  
  userRouter.get("/",(c)=>{
    return c.text("working fine")
  })