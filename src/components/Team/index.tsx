import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { fetchCardDetails } from './api';
import { API_URL, BASE_URL } from '../../utils/endpoint';

function Team() {
  const { id } = useParams(); 
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["teamDetails"],  
    queryFn: () => id && fetchCardDetails(parseInt(id)) ,
  });
  if (data) {
    const res =data.data
  
   
    
    return (
      <>
       
       <div className="maincont bg-pink-400 h-96 w-screen flex justify-evenly">
        <div className="left bg-green-300 h-72 w-1/2 my-auto flex">
          <img src={`${BASE_URL}${API_URL.TEAM.BANNER}/${encodeURIComponent(res.logo)}`} 
          alt="logo" 
          className='h-40 w-40 bg-blue-500 my-auto ml-12'
          />
          <h1>{res.name}</h1>
        </div>
        <div className="right  bg-gray-300 h-72 w-1/2 my-auto"></div>
       </div>
      </>
    );
  }
  
}

export default Team
