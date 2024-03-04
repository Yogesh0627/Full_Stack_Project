import React from 'react'
import { useBlog } from '../Hooks/UseBlogs'
import { useParams } from 'react-router-dom'
import SingleBlog from '../Components/SingleBlog'
import Navbar from '../Components/Navbar'
import { Spinner } from '../Components/Spinner'


const Blog:React.FC = () => {
  const {id} = useParams()
  const {loading,blog} = useBlog({id: id || ""})

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
    </div>
  )
}

export default Blog