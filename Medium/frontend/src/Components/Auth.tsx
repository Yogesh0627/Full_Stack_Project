import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { ChangeEvent, useContext, useState } from "react"
import { signInBody, } from "@yogesh0627/medium-common"
import axios from "axios"
import { BACKEND_URL, guestInputs } from "../config"
import { AuthContext } from "../Context/AuthContext"
import { UserContext } from "../Context/UserContext"
import toast from "react-hot-toast"


const postInputs = {
    name:"",
    email:"",
    password:""
}

const Auth = ({type}:{type: "signup" | "signin"}) => {
    const [inputs,setInputs] = useState<signInBody>(postInputs)
    const navigate = useNavigate()
    const {handleUser} = useContext(UserContext)

    const {Login} = useContext(AuthContext)

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    }

    const SignupRequest = async ()=>{

        if (inputs.email.trim().length === 0){
            toast.error("This field can not be empty")
            return
        }
        if (inputs.password.trim().length === 0){
            toast.error("This field can not be empty")
            return
        }
        let toastId = null

        if (type === "signup"){
            toastId=toast.loading("Signing up")
        }else{
            toastId=toast.loading("Signing in")
        }
        
        try {

            const response = await axios.post(`${BACKEND_URL}${type==="signup" ? "/user/signup":"/user/signin"}`,inputs)
            console.log(response)
            if (response?.data?.status){

                const token = response?.data?.token
            
                Login(token)
                handleUser(response?.data?.result)
            
                setInputs(postInputs)
                toast.success(response?.data?.msg,{id:toastId})
                navigate("/blogs")
            }

        else{toast.error(response?.data?.msg,{id:toastId})}
        } catch (error) {
            
            toast.error("Something went wrong",{id:toastId})
        }
    }

    const handleGuest=()=>{
        setInputs(guestInputs)
    }

  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="w-1/2 flex flex-col gap-4">
            <div className="text-center flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold">{type === "signup"? "Create an account":"Sign in"}</h2>
                <p className="font-normal text-slate-400">{type === "signup"?"Already have an account?":"Don't have an account?"} <Link className="pl-1 underline" to={type === "signup"? "/signin":"/signup"}>{type === "signup"? "Login":"Create Account"}</Link></p>
            </div>
            <div className="flex  flex-col gap-4">
               {type === "signup" ? <Input value={inputs.name} title={"Username"} type={"text"} name={"name"} placeholder={"Enter your username"} onChange={handleChange}/> : null}
                <Input title={"Email"} type={"email"}value={inputs.email}  name ={"email"} placeholder={"Enter your email"}  onChange={handleChange}/>
                <Input title={"Password"} value={inputs.password} type={"password"} name={"password"} placeholder={"Enter your password"} onChange={handleChange}/>
                <div className="">
                    <button onClick={SignupRequest} type="submit" className="bg-black h-12  text-xl font-medium rounded-sm  text-white w-full">{type ==="signup"?"Sign Up":"Sign In"}</button>
                </div>
                <div className={`${type==="signin"? "visible":"hidden"}`}>
                    <button onClick={handleGuest} type="submit" className="bg-black h-12  text-xl font-medium rounded-sm  text-white w-full">{type ==="signin"? "Guest Credentials" :""}</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Auth