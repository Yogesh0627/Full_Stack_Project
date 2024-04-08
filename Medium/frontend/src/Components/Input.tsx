import { ChangeEvent,  } from "react"

interface propsInput {
    placeholder : string,
    name:string,
    type? : string ,
    title : string,
    onChange : (e:ChangeEvent<HTMLInputElement>)=>void
    value?:string
}
const Input = ({placeholder,type="text",title,name,onChange,value}:propsInput) => {
  return (
    <div>
        <label className="text-lg font-medium" htmlFor="">{title}
        <br />
        <input className="w-full mt-2 p-2  focus:ring-blue-500 rounded-sm focus:outline-none focus:border-blue-500 bg-gray-50 border border-gray-300" type={type} placeholder={placeholder} value={value} onChange={onChange} name={name}  />
        </label>
    </div>
  )
}

export default Input