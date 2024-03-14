import React, { useEffect } from 'react'
import { useBlog } from '../Hooks/UseBlogs'
import { useParams } from 'react-router-dom'
import SingleBlog from '../Components/SingleBlog'
import Navbar from '../Components/Navbar'
import { Spinner } from '../Components/Spinner'



const Blog:React.FC = () => {
  const {id} = useParams()
  const {loading,blog} = useBlog({id: id || ""})


  useEffect(()=>{
    document.title = blog?.title
  })
  if(loading || !blog){
    return <div>
      <Navbar />
    <div className="h-screen flex flex-col justify-center">
        
        <div className="flex justify-center">
            <Spinner />
        </div>
    </div>
</div>
  }
  return (
    <div>

      <SingleBlog blog={blog}/>
      <div>
        <div className='w-10' title='Delete'></div>
        <div className='w-10' title='Delete'></div>
      </div>
    </div>
  )
}

export default Blog