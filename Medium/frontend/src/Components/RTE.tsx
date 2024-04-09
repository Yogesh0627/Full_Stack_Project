import Navbar from './Navbar'
import { ChangeEvent } from 'react'
import {Editor } from '@tinymce/tinymce-react';
import { TINY_MCE_KEY } from '../config';

interface Publish{
  handleTitleChange : (e:ChangeEvent<HTMLInputElement>)=>void
  handleTextChange : (newContent:string)=>void
  onClick : ()=> void,
  saveClick? : ()=> void,
  buttonTitle : string,
  titleValue?:string,
  contentValue?:string
  type: string,
}


const RTE = ({handleTitleChange,handleTextChange,onClick,buttonTitle,saveClick,type,titleValue,contentValue}:Publish) => {

  

  return (

    <div className='px-5'>
      <div>
      <Navbar />
      <div className="flex justify-center w-full pt-8"> 
      <div className="max-w-screen-lg w-full">
        <input onChange={handleTitleChange} defaultValue={titleValue}  name='title' type="text" className="w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

      <div>
      <Editor
      initialValue={contentValue}
      apiKey={TINY_MCE_KEY}
      init={{
        branding:false,
        initialValue: contentValue,
        height: 500,
        menubar: true,
        placeholder : "Content",
        auto_focus:true,
 

        plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
        ],
        toolbar:
        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
    }}
    onEditorChange={handleTextChange}
    />
    </div>

        <button onClick={onClick} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              {buttonTitle}
        </button>
      {type === "new" ?  <button onClick={saveClick} type="submit" className="mt-4 ml-10 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Draft
        </button> :''}
      </div>
  </div>
</div>
    </div>

  )
}

export default RTE