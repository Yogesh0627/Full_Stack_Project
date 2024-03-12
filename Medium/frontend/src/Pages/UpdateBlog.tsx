import  { ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlog } from '../Hooks/UseBlogs'
import Editor from '../Components/Editor'
// import { blogInput } from '@yogesh0627/medium-common'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { Spinner } from '../Components/Spinner'

const UpdateBlog = () => {
    const {id} = useParams()
    const {loading,blog,setBlog} = useBlog({id:id ||""})
    // const [publishBlog , setPublishBlog] = useState<blogInput>(blog)
    const navigate = useNavigate()
    console.log(blog)

    if(loading || !blog){
        return <h1><Spinner/></h1>
    }

        const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
      
          setBlog({...blog, title : e.target.value})
        }
        const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{
      
          setBlog({...blog, content : e.target.value})
        }
      
        console.log(blog)
        const updateBlogRequest = async ()=>{
          try {
            const response = await axios.put(`${BACKEND_URL}/blog/update/${id}`, blog, {
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
              const response = await axios.post(`${BACKEND_URL}/blog/save`, blog, {
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
    const publishBlogRequest = async ()=>{
            try {
              const response = await axios.post(`${BACKEND_URL}/blog`, blog, {
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
  return (
    <div>
        <Editor handleTitleChange= {handleChange} 
            titleValue ={blog.title} contentValue = {blog.content} 
            type={blog.published? "":"new"}
            handleTextChange = {handleTextChange} 
            buttonTitle={blog.published?'Update & Publish':"Publish"} onClick={blog.published? updateBlogRequest : publishBlogRequest}
            saveClick={handleSave}
        />
    </div>
  )
}

export default UpdateBlog