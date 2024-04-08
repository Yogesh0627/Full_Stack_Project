import BlogCard from "../Components/BlogCard"
import { useBlogs } from "../Hooks/UseBlogs"
import Navbar from "../Components/Navbar"
import Skeleton from "../Components/Skeleton"
import { useEffect } from "react"



const Blogs = () => {
  const {loading,blogs} = useBlogs()

  useEffect(()=>{
    document.title = "Medium"
  })
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
  const newBlogs  = blogs.slice().reverse()

  const allBlogs = newBlogs.map((blog)=> <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} authorName={blog.author.name || "Anonymous"} publishedDate="Jan 01, 2024" />)
  return ( 
    <div>
      <div className="border-b border-slate-200">
        <Navbar/>
      </div>

      <div className="flex justify-center">
          <div className="max-w-xl m-auto mt-10  gap-6">
            {allBlogs}
          </div>
      </div>
    </div>
  )
}

export default Blogs