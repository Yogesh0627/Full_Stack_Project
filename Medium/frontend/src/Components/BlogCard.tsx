import { Link } from 'react-router-dom'
import Avatar from './Avatar'

interface BlogCardProps{
    id:string
    authorName : string,
    title : string,
    publishedDate : string,
    content : string
}
const BlogCard = ({authorName,id,title,publishedDate ,content}:BlogCardProps) => {
  return (
    <Link to={`/blogs/${id}`}>
        <div className='border-b border-slate-200  py-4'>
        <div className='flex gap-2'>
            <div className='flex items-center justify-center'><Avatar name={authorName}/></div>
            <div className='flex gap-2 items-center'>
                <p>{authorName}</p>
                <div  className='bg-gray-300 rounded-full w-1 h-1'></div>
                <p className='font-normal text-gray-400 text-sm'>{publishedDate}</p>
                <p>✨</p>
                <p className='text-sm font-normal text-gray-400'>Member-only</p>
            </div>
        </div>
        <div className='text-xl font-bold mt-3'>
            <p>{title}</p>
        </div>
        <div className='text-md font-normal mt-1'>
            <p>{content.length>100 ? content.substring(0,100)+"...":content}</p>
        </div>

        <div className='font-normal mt-4 text-gray-400 text-sm'>
            {Math.ceil(content.length /100) + " min read"}
        </div>
    </div>
    </Link>
  )
}

export default BlogCard