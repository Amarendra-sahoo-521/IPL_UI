import axios from "axios";
import { API_URL, BASE_URL } from "../../utils/endpoint";

export const fetchMatchDetails = async (ID :number) => {
 
    const url = `${BASE_URL}${API_URL.MATCHES.ONE_MATCH}${ID}`
    
    const response = await axios.get(url);
     
    
    return response.data;
  };