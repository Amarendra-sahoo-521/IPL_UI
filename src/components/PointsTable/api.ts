import axios from "axios";
import { API_URL, BASE_URL } from "../../utils/endpoint"

export const PointsTableGetAll = async ()=>{
    const url=`${BASE_URL}${API_URL.POINTS_TABLE.GETALL}`
    const response = await axios.get(url);
    return response.data;
}