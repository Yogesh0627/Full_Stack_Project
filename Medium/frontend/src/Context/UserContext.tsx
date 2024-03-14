import { ReactNode, createContext, useState } from "react";

interface UserContextType {
    handleUser : (user:User)=>void;
    user:User
}

const initialContext = {
    handleUser :()=>{},
    user : {
      id:"",
      email:"",
      password:"",
      name:"",
    }
}
interface User{
    id   :string,
    email :string,
    password :string, 
    name    :string,
    post? :[]
}
const initialUserDetails = {
    name:"",
    id:"",
    email:"",
    password:""
  }
  export const UserContext = createContext<UserContextType>(initialContext);
  export const UserContextProvider = ({ children }:{children:ReactNode}) => {

  
    const [user,setUser] = useState<User>(initialUserDetails)
  
  
    const handleUser = (user:User) =>{
      setUser(user)
    }
    return (
      <UserContext.Provider value={{ handleUser,user }}>
        {children}
      </UserContext.Provider>
    );
  };