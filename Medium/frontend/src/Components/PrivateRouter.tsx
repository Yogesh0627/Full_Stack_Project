import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


interface PrivateRouterProps {
  children: ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {

  const auth = localStorage.getItem("token")? true:false

  if (!auth) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export default PrivateRouter;