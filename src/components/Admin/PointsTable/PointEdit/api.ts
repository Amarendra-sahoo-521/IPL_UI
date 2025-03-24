import axios from "axios"
import { API_URL, BASE_URL } from "../../../../utils/endpoint"

export const editPointData = async (id:number,data:any)=>{
    const url= `${BASE_URL}${API_URL.POINTS_TABLE.UPDATE_POINTS_TABLE}${id}`
    
    const response = await axios.patch(url,data)
    return response.data
  }