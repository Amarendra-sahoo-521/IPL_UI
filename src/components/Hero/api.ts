import { API_URL, BASE_URL } from "../../utils/endpoint";
import { handleError } from "../../utils/functions";
import axios from "axios";

export const teamAllData = async () => {
  try {
    const response = await fetch(API_URL.TEAM.GETALL, {method: "GET"});

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

   
    const data = await response.json();
    console.log(data);
    
    return data;

  } catch (err: any) {
   
    throw handleError(err);
  }
};


export const getPostt = async () => {
  const url = `${BASE_URL}${API_URL.TEAM.GETALL}`
  const response = await axios.get(url);
  // console.log(response.data);
  
  return response.data;
};

export const getBanner = async (ID :number) => {
  const url = `${BASE_URL}${API_URL.TEAM.BANNER}${ID}`
  const response = await axios.get(url);
  // console.log(response.data);
  
  return response.data;
};


