import { ChangeEvent,  } from "react"

interface propsInput {
    placeholder : string,
    name:string,
    type? : string ,
    title : string,
    value:string
    onChange : (e:ChangeEvent<HTMLInputElement>)=>void
}
const Input = ({placeholder,value,type="text",title,name,onChange}:propsInput) => {
  return (
    <div>
        <label className="text-lg font-medium" htmlFor="">{title}
        <br />
        <input className="w-full mt-2 p-2 focus:ring-blue-500 rounded-sm focus:outline-none focus:border-blue-500 bg-gray-50 border border-gray-300" type={type} value={value} placeholder={placeholder} onChange={onChange} name={name}  />
        </label>
    </div>
  )
}

export default Input