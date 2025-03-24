import axios from "axios";
import { API_URL, BASE_URL } from "../../utils/endpoint";

export const fetchMyMatches = async (ID :number) => {
 
    const url = `${BASE_URL}${API_URL.MATCHES.MYMATCHES}/${ID}`
    const response = await axios.get(url);
    return response.data.data;
  };

export const fetchMyHomeMatches = async (ID :number) => {
 
    const url = `${BASE_URL}${API_URL.MATCHES.MYHOMEMATCHES}/${ID}`
    const response = await axios.get(url);
    return response.data.data;
  };
export const fatchAllMatches = async(page:number)=>{
  const url = `${BASE_URL}${API_URL.MATCHES.MATCHES}${page}`
  const responce = await axios.get(url)
  return responce.data.data;
}
export const fatchAdminMatches = async ()=>{
  const url = `${BASE_URL}${API_URL.MATCHES.ADMIN_MATCHES}`
  const responce = await axios.get(url)
  return responce.data.data;
}
