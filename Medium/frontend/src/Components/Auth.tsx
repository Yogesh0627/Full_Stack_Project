import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { ChangeEvent, useContext, useState } from "react"
import { signInBody, } from "@yogesh0627/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { AuthContext } from "../Context/AuthContext"


const postInputs = {
    name:"",
    email:"",
    password:""
}
const Auth = ({type}:{type: "signup" | "signin"}) => {
    const [inputs,setInputs] = useState<signInBody>(postInputs)
    const {name,email,password} = inputs
    const navigate = useNavigate()

    const {Login} = useContext(AuthContext)

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    }

    const SignupRequest = async ()=>{
        try {
            const response = await axios.post(`${BACKEND_URL}${type==="signup" ? "/user/signup":"/user/signin"}`,inputs)
            // console.log(response)
            if (response.data.status === true){
            const token = response.data.token
            // console.log("toekn"+"from localStroigate",localStorage.getItem("token"))
            Login(token)
            navigate("/blogs")
            setInputs(postInputs)
        }

        else{alert (response.data.msg)}
        } catch (error) {
            alert("Error failed")
        }
    }


  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="w-1/2 flex flex-col gap-4">
            <div className="text-center flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold">{type === "signup"? "Create an account":"Sign in"}</h2>
                <p className="font-normal text-slate-400">{type === "signup"?"Already have an account?":"Don't have an account?"} <Link className="pl-1 underline" to={type === "signup"? "/signin":"/signup"}>{type === "signup"? "Login":"Create Account"}</Link></p>
            </div>
            <div className="flex  flex-col gap-4">
               {type === "signup" ? <Input title={"Username"} value = {name || "" }  type={"text"} name={"name"} placeholder={"Enter your username"} onChange={handleChange}/> : null}
                <Input title={"Email"} type={"email"} value={email} name ={"email"} placeholder={"Enter your email"} onChange={handleChange}/>
                <Input title={"Password"} type={"password"} value={password} name={"password"} placeholder={"Enter your password"} onChange={handleChange}/>
                <div className="">
                    <button onClick={SignupRequest} type="submit" className="bg-black h-12  text-xl font-medium rounded-sm  text-white w-full">{type ==="signup"?"Sign Up":"Sign In"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth