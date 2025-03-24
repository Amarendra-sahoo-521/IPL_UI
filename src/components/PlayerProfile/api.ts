import axios from "axios"
import { API_URL, BASE_URL } from "../../utils/endpoint"

export const getPlayerProfile = async(id:string)=>{
    const url = `${BASE_URL}${API_URL.PLAYER.GETONE}${id}`
    const responce = await axios.get(url)
    return responce.data;
}  