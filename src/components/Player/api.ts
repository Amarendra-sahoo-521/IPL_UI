import axios from "axios";
import { API_URL, BASE_URL } from "../../utils/endpoint";


export const fetchPlayerData = async(page:number,payload:string)=>{

    let url = `${BASE_URL}${API_URL.PLAYER.GETALL}${page}${payload}`
    const responce:any =await axios.get(url);
    // console.log('rrrrrrrrrrrr',responce);
    
    return responce.data 
}