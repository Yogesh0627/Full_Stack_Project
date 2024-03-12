import  { ChangeEvent, useState } from 'react'

import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { blogInput } from '@yogesh0627/medium-common'
import Editor from '../Components/Editor'


const initialState = {
  title : "",
  content : ""
}
const Publish = () => {
  const [publishBlog , setPublishBlog] = useState<blogInput>(initialState)
  const navigate = useNavigate()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{

    setPublishBlog({...publishBlog, title : e.target.value})
  }
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>)=>{

    setPublishBlog({...publishBlog, content : e.target.value})
  }

  console.log(publishBlog)
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
//     <div>
//       <Navbar />
//       <div className="flex justify-center w-full pt-8"> 
//       <div className="max-w-screen-lg w-full">
//         <input onChange={handleChange} name='title' type="text" className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

//         <TextEditor onChange={handleTextChange} name="content" />
        
//         <button onClick={publishBlogRequest} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
//               Publish post
//           </button>
//       </div>
//   </div>
// </div>

<Editor handleTitleChange= {handleChange} type="new" handleTextChange = {handleTextChange} buttonTitle='Publish Post' onClick={publishBlogRequest} saveClick={handleSave}/>
)}


export default Publish