import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

export interface Blog {
    "content": string;
    "title": string;
    "id": string,
    "authorId":string,
    "published"?:boolean
    "author": {
        "name": string
    }
}
export const useBlogs  = ()=>{
    const [loading,setLoading] = useState(false)
    const [blogs,setBlogs] = useState<Blog[]>([])

    
   
    useEffect( ()=>{
        setLoading(true)
        try {
            axios.get(`${BACKEND_URL}/blog/bulk`,{
                headers : {
                    // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXVoYW55b2dlc2g5NTBAZ21haWwuY29tIiwiaWQiOiJlZDA0ZGQxNi00YTEwLTRiMzctYmQwMi1jMTY2OTkyMGM0ZTAifQ.Gb_7pimB1QjyuA6fIFLS66h8NmCIMxRRbR_AaA9D340"
                    Authorization : "Bearer"+" "+localStorage.getItem("token")
                }
                
            }).then(response=>{
                setBlogs(response.data.result)
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        
    },[])

    return {loading,blogs}
}

export const useBlog = ({id}:{id:string})=>{
    const [loading,setLoading] = useState(false)
    const [blog,setBlog]= useState<Blog>()

    useEffect( ()=>{
        setLoading(true)
        axios.get(`${BACKEND_URL}/blog/${id}`,{
            headers : {
                // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXVoYW55b2dlc2g5NTBAZ21haWwuY29tIiwiaWQiOiJlZDA0ZGQxNi00YTEwLTRiMzctYmQwMi1jMTY2OTkyMGM0ZTAifQ.Gb_7pimB1QjyuA6fIFLS66h8NmCIMxRRbR_AaA9D340"
                Authorization : "Bearer"+" "+localStorage.getItem("token")
            }
        
        }).then(response=>{

            setBlog(response.data.result)
            setLoading(false)
        })
        
    },[id])

    return {loading,blog}

}



export const useMyBlogs = ()=>{
    const [myblogs,setMyBlogs] = useState<Blog[]>([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        const response = axios.get(`${BACKEND_URL}/blog/myblogs`,{
          headers : {
              // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXVoYW55b2dlc2g5NTBAZ21haWwuY29tIiwiaWQiOiJlZDA0ZGQxNi00YTEwLTRiMzctYmQwMi1jMTY2OTkyMGM0ZTAifQ.Gb_7pimB1QjyuA6fIFLS66h8NmCIMxRRbR_AaA9D340"
              Authorization : "Bearer"+" "+localStorage.getItem("token")
          }
          
      }).then(response=>{
          console.log("response",response)
          setMyBlogs(response.data.result)
          setLoading(false)
      })
    
        console.log(response)
      },[])

      return {myblogs,loading,setMyBlogs}
}