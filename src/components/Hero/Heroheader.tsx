import React from 'react'
import { getPostt } from './api';
import { useQuery } from '@tanstack/react-query';
import SmoothOverlapSlider from './Hero';

function Heroheader() {

    const { data, error, isLoading } = useQuery({
        queryKey: ["post"],  
        queryFn: getPostt,
      });

    
     
      
  return (
    <div>
      {data && <SmoothOverlapSlider cards={data.data}  title = "Teams"  autoPlayInterval = {5000} />}
    </div>
  )
}

export default Heroheader
