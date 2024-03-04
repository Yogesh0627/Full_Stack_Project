import  z from "zod";

export const signUpBody = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})

export const signInBody = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})

export const blogInput = z.object({
    title : z.string(),
    content : z.string()
})

export const updateInput = z.object({
    title : z.string(),
    content : z.string(),
})

export type blogInput = z.infer<typeof blogInput>
export type updateInput = z.infer<typeof updateInput>
export type signInBody = z.infer<typeof signInBody>
export type signUpBody = z.infer<typeof signUpBody>
