import axios from "axios"
import { API_URL, BASE_URL } from "../../utils/endpoint"

export const getTopPlayer=async ()=>{
    const url = `${BASE_URL}${API_URL.PLAYER.TOPPLAYER}`
    const responce:any =await axios.get(url);
    
    return responce && responce.data
}