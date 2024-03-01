import { WalletContext } from '@/context/WalletContext'
import { ok } from 'assert'
import React, { useContext, useEffect, useState } from 'react'

interface propsType{
    planetName:string;
}

const useReycleLength = ({ planetName }: propsType):number | undefined => {

    const[recycleLength,setRecycleLength] = useState<number>()
    const walletContext = useContext(WalletContext)
    const userAddress = walletContext?.userAddress

    const getRecycleLength = async () =>{
        
        try {
            const query = `${process.env.NEXT_PUBLIC_URL}/user/getRecycleCount/${userAddress}/${planetName}`
            console.log(query)
            const response = await fetch(query)

            if(response.ok){
                const data = await response.json();
                console.log("length",data.recycleCountLength)
                setRecycleLength(data);

            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
     if(userAddress){
        getRecycleLength()
     }
    },[])


    

    return recycleLength
  
}

export default useReycleLength