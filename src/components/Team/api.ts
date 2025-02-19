import axios from "axios";
import { API_URL, BASE_URL } from "../../utils/endpoint";

export const fetchCardDetails = async (ID :number) => {
 
    const url = `${BASE_URL}${API_URL.TEAM.GETONE}/${ID}`
    const response = await axios.get(url);
     
    
    return response.data;
  };