
const Avatar = ({name,size="small"}:{name:string,size?:"small"|"large"}) => {
  return (
    <div>
        
<div className={`relative inline-flex items-center justify-center ${size ==="small" ? "w-6 h-6":"w-10 h-10" } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`font-medium ${size ==="small" ? "text-xs":"text-md" } text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>

    </div>
  )
}

export default Avatar