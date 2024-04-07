import  { ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlog } from '../Hooks/UseBlogs'
import Editor from '../Components/Editor'

import { BACKEND_URL } from '../config'
import axios from 'axios'
import { Spinner } from '../Components/Spinner'
import Navbar from '../Components/Navbar'

// import RTE from '../Components/RTE'

const UpdateBlog = () => {
    const {id} = useParams()
    const {loading,blog,setBlog} = useBlog({id:id ||""})

    const navigate = useNavigate()

    if(loading || !blog){
      return <div>
      <Navbar />
    <div className="h-screen flex flex-col justify-center">
        
        <div className="flex justify-center">
            <Spinner />
        </div>
    </div>
</div>}

        const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
      
          setBlog({...blog, title : e.target.value})
        }
        const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{

          setBlog({...blog, content : e.target.value})
        }

        //      in case of RTE only
        // const handleTextChange = (newContent:string)=>{
      
        //   setBlog({...blog, content : newContent})
        // }
      
        const updateBlogRequest = async ()=>{
          try {
            const response = await axios.put(`${BACKEND_URL}/blog/update/${id}`, blog, {
              headers: {
                  Authorization : "Bearer"+" "+localStorage.getItem("token")
      
              }});
              navigate(`/blogs/${response.data.result.id}`)
      
          } catch (error) {
            console.log("An error occured",error)
          }
        }

    const handleSave = async ()=>{
            try {
              const response = await axios.post(`${BACKEND_URL}/blog/save`, blog, {
                headers: {
                    Authorization : "Bearer"+" "+localStorage.getItem("token")
        
                }});
                console.log(response)
                navigate(`/blogs/${response.data.result.id}`)
        
            } catch (error) {
              console.log("An error occured",error)
            }
          }
    const publishBlogRequest = async ()=>{
            try {
              const response = await axios.post(`${BACKEND_URL}/blog`, blog, {
                headers: {
                    Authorization : "Bearer"+" "+localStorage.getItem("token")
        
                }});
                console.log(response)
                navigate(`/blogs/${response.data.result.id}`)
        
            } catch (error) {
              console.log("An error occured",error)
            }
          }
  return (
    <div>
        <Editor handleTitleChange= {handleChange} 
            titleValue ={blog.title} contentValue = {blog.content} 
            type={blog.published? "":"new"}
            handleTextChange = {handleTextChange} 
            buttonTitle={blog.published?'Update & Publish':"Publish"} onClick={blog.published? updateBlogRequest : publishBlogRequest}
            saveClick={handleSave}
        />
        {/* <RTE handleTitleChange= {handleChange} 
            titleValue ={blog.title} contentValue = {blog.content} 
            type={blog.published? "":"new"}
            handleTextChange = {handleTextChange} 
            buttonTitle={blog.published?'Update & Publish':"Publish"} onClick={blog.published? updateBlogRequest : publishBlogRequest}
            saveClick={handleSave}
        /> */}
    </div>
  )
}

export default UpdateBlog