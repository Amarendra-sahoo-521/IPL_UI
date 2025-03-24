import axios from "axios"
import { API_URL, BASE_URL } from "../../../../utils/endpoint"

export const editPlayerData = async (id:number,data:any)=>{
    const url= `${BASE_URL}${API_URL.PLAYER.UPDATE_PLAYER}${id}`
    
    const response = await axios.patch(url,data)
    return response.data
}