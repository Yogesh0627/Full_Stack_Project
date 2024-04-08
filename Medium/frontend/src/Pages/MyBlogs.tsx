
import BlogCard from '../Components/BlogCard'
import Navbar from '../Components/Navbar'
import Skeleton from '../Components/Skeleton'
import { useMyBlogs } from '../Hooks/UseBlogs'
import Edit from '../Components/Edit'
import Delete from '../Components/Delete'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


const MyBlogs = () => {

  const {myblogs,loading,setMyBlogs}= useMyBlogs()

  const [Publish, setPublish] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(()=>{
    document.title = "Medium"
  },[])
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
    return <div><Navbar/><div className='flex mt-10 justify-center items-center text-5xl'><h1>No Blogs Found</h1></div></div>
  }
  
  const handleUpdate = (id:string)=>{

    navigate(`update/${id}`)
  }

  const handleDelete = async (blogId:string)=>{

    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${blogId}`,{
        headers:{
          Authorization : "Bearer"+" "+localStorage.getItem("token")
        }
      })
      // console.log("response after delte :-",response)
      if(response.data.status === true){
        const myNewBlogs = myblogs.filter((blog) => blog.id !== blogId)
        toast.success(response?.data?.msg)
        setMyBlogs(myNewBlogs)
      }else{
        toast.error('Blog not deleted / Not found ')
      }
    } catch (error) {
      console.log("some Error occureed",error)
      toast.error("Some Error Occured")
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
const handlePublish=()=>{

  setPublish(true)

}
const handleNonPublish=()=>{

  setPublish(false)
  // setNonPublish(!nonPublish)
}

return (
  <div className=''>
    <div>
      <Navbar/>
    </div>

    <div className='flex justify-center px-4   items-center gap-10 mt-10'>
      <button disabled={Publish} className='rounded-lg bg-black text-white px-2 py-3 cursor-pointer' onClick={handlePublish}>Published Blogs</button>
      <span>||</span>
      <button disabled={!Publish}  className='rounded-lg bg-black text-white px-2 py-3 cursor-pointer' onClick={handleNonPublish}>Non - Published Blogs</button>
    </div>

    <div className='flex justify-center   mt-4 items-center'>
        <div className='max-w-xl'>
          <h1 className='text-3xl p-5 font-semibold mt-6'>{Publish? "Published Blogs":"Non-Published Blogs"}</h1>
          <div className='mt-5  '>
            {Publish? publishedBlogs:nonPublishedBlogs}
          </div>
        </div>
    </div>
  </div>
  )
}

export default MyBlogs