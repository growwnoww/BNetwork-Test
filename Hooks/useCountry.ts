'use client';
import React, { useEffect, useState } from 'react'

interface Country{
  alpha3Code:string;
  flag:string;
}

const useCountry = () => {
    const [country,setCountry] = useState<Country[]|null>();

    const fetchCountry = async () =>{
        try {
          const res = await fetch("https://restcountries.com/v2/all");
         
          if(res.ok){
           const data:Country[] = await res.json();
           setCountry(data);
          }
 
        } catch (error) {
          console.log("Error in fetching country data",error)
        }
    }

    useEffect(() =>{
      fetchCountry();
    },[])


    return country;
}

export default useCountry;