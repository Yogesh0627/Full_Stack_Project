import axios from "axios"
import { API_SERVER_CHECK } from "../config"
// import { BACKEND_URL } from "../config"

export const checkServerLive = async (setSeverLive:(live:boolean)=>void)=>{
    try {
        const response = await axios.get(`${API_SERVER_CHECK}`)
        // console.log(response.data)
        const {live}:{live:boolean} = response.data
        if(live){
            setSeverLive(live)
            localStorage.setItem("msg","false")
        }
    } catch (error) {
        console.log(error)
    }
}