
import TextEditor from './TextEditor'
import Navbar from './Navbar'
import { ChangeEvent } from 'react'

interface Publish{
  handleTitleChange : (e:ChangeEvent<HTMLInputElement>)=>void
  handleTextChange : (e: ChangeEvent<HTMLTextAreaElement>)=>void
  onClick : ()=> void,
  saveClick? : ()=> void,
  buttonTitle : string,
  titleValue?:string,
  contentValue?:string
  type: string
}

const Editor = ({handleTitleChange,handleTextChange,onClick,buttonTitle,saveClick,type,titleValue,contentValue}:Publish) => {
  if (type === "new"){
    console.log("New from editor")
  }
  if(type != "new"){
    console.log("published blog from editor")
  }
  return (
    <div>
      <div>
      <Navbar />
      <div className="flex justify-center w-full pt-8"> 
      <div className="max-w-screen-lg w-full">
        <input onChange={handleTitleChange} defaultValue={titleValue}  name='title' type="text" className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

        <TextEditor contentValue={contentValue || ""} onChange={handleTextChange} name="content" />
        
        <button onClick={onClick} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              {buttonTitle}
        </button>
      {type === "new" ?  <button onClick={saveClick} type="submit" className="mt-4 ml-10 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Save
        </button> :''}
      </div>
  </div>
</div>
    </div>
  )
}

export default Editor