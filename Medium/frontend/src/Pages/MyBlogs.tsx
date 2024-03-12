
import BlogCard from '../Components/BlogCard'
import Navbar from '../Components/Navbar'
import Skeleton from '../Components/Skeleton'
import { useMyBlogs } from '../Hooks/UseBlogs'
import Edit from '../Components/Edit'
import Delete from '../Components/Delete'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const MyBlogs = () => {

  const {myblogs,loading,setMyBlogs}= useMyBlogs()
  const [nonPublish, setNonPublish] = useState<boolean>(false)
  const [Publish, setPublish] = useState<boolean>(true)

  const navigate = useNavigate()
  console.log(myblogs)

  if (loading) {
    return <div>
        <Navbar /> 
        <div  className="flex justify-center">
            <div>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </div>
    </div>
  }

  
  if(myblogs.length === 0 ){
    return <div><Navbar/><h1>No Blog Found</h1></div>
  }
  
  const handleUpdate = (id:string)=>{

    console.log("handle update called",id)
    navigate(`update/${id}`)
  }
  const handleDelete = async (blogId:string)=>{
    console.log(blogId)
    console.log("handleDelete Called form my blog")
    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${blogId}`,{
        headers:{
          Authorization : "Bearer"+" "+localStorage.getItem("token")
        }
      })
      console.log("response after delte :-",response)
      if(response.data.status === true){
        const myNewBlogs = myblogs.filter((blog) => blog.id !== blogId)
        setMyBlogs(myNewBlogs)
      }
    } catch (error) {
      console.log("some Error occureed",error)  
    }
  }

  const allPublishedBlogs = myblogs.filter((blog)=> blog.published === true)
  const allNonPublishedBlogs = myblogs.filter((blog)=> blog.published !== true)

  const publishedBlogs = allPublishedBlogs.map((blog) => (
    <div className='flex w-fit' key={blog.id}>
      <div className='flex'>
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          authorName={blog.author.name || "Anonymous"}
          publishedDate="Jan 01, 2024"
        />
        <div className='flex w-fit'>
          <div className='w-12' title='Edit'>
            <Edit blogId={blog.id} onClick={handleUpdate} />
          </div>
          <div className='w-10' title='Delete'>
            <Delete blogId={blog.id} onClick={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  ));
  const nonPublishedBlogs = allNonPublishedBlogs.map((blog) => (
    <div className='flex w-fit' key={blog.id}>
      <div className='flex'>
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          authorName={blog.author.name || "Anonymous"}
          publishedDate="Jan 01, 2024"
        />
        <div className='flex w-fit'>
          <div className='w-12' title='Edit'>
            <Edit blogId={blog.id} onClick={handleUpdate} />
          </div>
          <div className='w-10' title='Delete'>
            <Delete blogId={blog.id} onClick={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  ));
const handleNonPublish=()=>{
  setPublish(!Publish)
  setNonPublish(!nonPublish)
}

return (
  <div>
    <div>
    <Navbar/>
    </div>

    <div className='flex'>
      <div className='w-1/2'>
        <button disabled={Publish === true} onClick={handleNonPublish} className='hover:cursor-pointer'><h1 >Published Blogs </h1></button>
        <div  className={`${Publish? "block":"hidden" } `}>
          {publishedBlogs}
        </div>
      </div>
      <div className='w-1/2'>
      <button disabled={nonPublish === true} onClick={handleNonPublish} className='hover:cursor-pointer'><h1 >Non -Published Blogs </h1></button>
        <div className={`${nonPublish? "block":"hidden" } `}>
          {nonPublishedBlogs}
        </div>
      </div>
    </div>
  </div>
  )
}

export default MyBlogs