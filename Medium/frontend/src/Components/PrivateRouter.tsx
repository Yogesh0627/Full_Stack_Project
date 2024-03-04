import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

interface PrivateRouterProps {
  children: ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to={"/signin"} />;
  }

  return <>{children}</>;
};

export default PrivateRouter;