

import { Toaster } from 'react-hot-toast'
import AllRoutes from './Components/AllRoutes'
import { useEffect, useState } from 'react'
import { checkServerLive } from './utils/checkServerLive'
import { DisclaimerModal } from './Components/Modals/DisclaimerModal'



function App() {
  const [serverLive,setServerLive]= useState<boolean>(false)
  const [showMessage] = useState<boolean>(localStorage.getItem("msg")==="false"? false:true)
  useEffect(()=>{
    checkServerLive(setServerLive)
  },[])
  return (
    <>
      {showMessage && <DisclaimerModal serverLive={serverLive}/>}
      <Toaster position='top-center'/>
      <AllRoutes/>
    </>
  )
}

export default App
