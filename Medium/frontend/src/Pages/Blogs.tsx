import BlogCard from "../Components/BlogCard"
import { useBlogs } from "../Hooks/UseBlogs"
import Navbar from "../Components/Navbar"
import Skeleton from "../Components/Skeleton"




const Blogs = () => {
  const {loading,blogs} = useBlogs()


  
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


  const allBlogs = blogs.map((blog)=> <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} authorName={blog.author.name || "Anonymous"} publishedDate="Jan 01, 2024" />)
  return ( 
    <div>
      <div className="border-b border-slate-200">
        <Navbar/>
      </div>

      <div className="flex justify-center">

          <div className="max-w-xl  gap-6">
            {allBlogs}
            <BlogCard title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing" 
            content="No need to create a fancy and modern website with hundreds of pages to make money online . -- Making money online is the dream for man..."
            authorName="hter V."
            id="a"
            publishedDate="Dec 3, 2023"/>
            <BlogCard title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing" 
            content="No need to create a fancy and modern website with hundreds of pages to make money online . -- Making money online is the dream for man..."
            id="b"
            authorName="hter V."
            publishedDate="Dec 3, 2023"/>
            <BlogCard title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing" 
            content="No need to create a fancy and modern website with hundreds of pages to make money online . -- Making money online is the dream for man..."
            id="c"
            authorName="hter V."
            publishedDate="Dec 3, 2023"/>
        </div>
      </div>
    </div>
  )
}

export default Blogs