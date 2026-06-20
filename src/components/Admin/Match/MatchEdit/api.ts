import axios from "axios"
import { API_URL, BASE_URL } from "../../../../utils/endpoint"

export const editmatchData = async (id:number,data:any)=>{
    const url= `${BASE_URL}${API_URL.MATCHES.EDIT_MATCH}${id}`
    
    const response = await axios.patch(url,data)
    return response.data
  }