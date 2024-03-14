import { ReactNode, createContext, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
    isAuth: boolean;
    Login: (token: string) => void;
    Logout: () => void;
  }


const initialContext = {
    isAuth:false,
    Login: () => {},
    Logout: () => {},
}
export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthContextProvider = ({ children }:{children:ReactNode}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

 

  const Login = (token:string) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };

  
  const Logout = () => {

    localStorage.removeItem("token");
    setIsAuth(false);
    return <Navigate to="/" />;

  };


  return (
    <AuthContext.Provider value={{ isAuth, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};