import  { ChangeEvent, useEffect, useState } from 'react'

import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { blogInput } from '@yogesh0627/medium-common'
// import RTE from '../Components/RTE'
import Editor from '../Components/Editor'


const initialState = {
  title : "",
  content : ""
}

const Publish = () => {
  const [publishBlog , setPublishBlog] = useState<blogInput>(initialState)
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = "New Story - Medium"
  },[])
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{

    setPublishBlog({...publishBlog, title : e.target.value})
  }
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{

    setPublishBlog({...publishBlog, content : e.target.value})
  }

  // in case of RTE
  // const handleTextChange = (newContent:string)=>{

  //   setPublishBlog({...publishBlog, content : newContent})
  // }


  const publishBlogRequest = async ()=>{
    try {
      const response = await axios.post(`${BACKEND_URL}/blog`, publishBlog, {
        headers: {
            // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXVoYW55b2dlc2g5NTBAZ21haWwuY29tIiwiaWQiOiJlZDA0ZGQxNi00YTEwLTRiMzctYmQwMi1jMTY2OTkyMGM0ZTAifQ.Gb_7pimB1QjyuA6fIFLS66h8NmCIMxRRbR_AaA9D340"
            Authorization : "Bearer"+" "+localStorage.getItem("token")

        }});
        console.log(response)
        navigate(`/blogs/${response.data.result.id}`)

    } catch (error) {
      console.log("An error occured",error)
    }
  }
  const handleSave = async ()=>{
    try {
      const response = await axios.post(`${BACKEND_URL}/blog/save`, publishBlog, {
        headers: {
            // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXVoYW55b2dlc2g5NTBAZ21haWwuY29tIiwiaWQiOiJlZDA0ZGQxNi00YTEwLTRiMzctYmQwMi1jMTY2OTkyMGM0ZTAifQ.Gb_7pimB1QjyuA6fIFLS66h8NmCIMxRRbR_AaA9D340"
            Authorization : "Bearer"+" "+localStorage.getItem("token")

        }});
        console.log(response)
        navigate(`/blogs/${response.data.result.id}`)

    } catch (error) {
      console.log("An error occured",error)
    }
  }
  return( 
  <div>
    <Editor handleTitleChange= {handleChange} type="new"  
      handleTextChange = {handleTextChange} buttonTitle='Publish Post' 
      onClick={publishBlogRequest} saveClick={handleSave}
    />
    {/* <RTE handleTitleChange= {handleChange} type="new"  
      handleTextChange = {handleTextChange} buttonTitle='Publish Post' 
      onClick={publishBlogRequest} saveClick={handleSave}
    /> */}
  </div>
)}


export default Publish