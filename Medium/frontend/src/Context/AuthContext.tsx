import { ReactNode, createContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface AuthContextType {
    isAuth: boolean;
    Login: (token: string) => void;
    Logout: () => void;
    token:string
  }


const initialContext = {
    isAuth:false,
    Login: () => {},
    Logout: () => {},
    token: localStorage.getItem("token")||""
}
export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider = ({ children }:{children:ReactNode}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [token,setToken] = useState("")
 

  const Login = (token:string) => {

    localStorage.setItem("token", token);
    setIsAuth(true);
    setToken(token)
  };

  
  const Logout = () => {

    localStorage.removeItem("token");
    toast.success("Sign out Successfully")
    setIsAuth(false);
    return <Navigate to="/" />;

  };


  return (
    <AuthContext.Provider value={{ isAuth, Login, Logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};