
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.tsx'
import { UserContextProvider } from './Context/UserContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(

  <AuthContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </AuthContextProvider>
)
