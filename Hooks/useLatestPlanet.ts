"use client";

import { bNetwork } from '@/contract/Web3_Instance';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';

const useLatestPlanet = () => {

    const [planetCount,setPlanetCount] = useState<number>(0)
    const {address,isConnected}  = useAccount();

    const getUserPlanetCount = async () =>{
        try {
            if (!address || !isConnected) {
                setPlanetCount(0); // Ensure user is marked as not registered if disconnected
                return;
            }

            const MyContract = bNetwork();
            console.log("user address before plannet count",address)
            const planetCount = await MyContract!.userPlannet(address);
            const numberFormat = ethers.BigNumber.from(planetCount).toNumber()
            console.log("user planet count",numberFormat)

            setPlanetCount(planetCount);
        } catch (error) {
            console.error("Something went wrong in getUserDetails", error);
            setPlanetCount(0); 
        }
    }

    
useEffect(()=>{
   getUserPlanetCount()
},[address])

  return planetCount;
}



export default useLatestPlanet