"use client";
import { PlanetUpgrade_Address, PlanetUprade_ABI } from '@/contract/Web3_Instance';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'

function MobStatistics() {

    const[participants,setParticipants] = useState<number | null>(0)
    const [totalIncome,setTotalIncome] = useState<number | null>(323560)
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);


    
    
    
        const getParticipants = async () => {
            try {
               const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getTotalParticipant`)
               if(response.data){
                const data = response.data.totalParticipants;
                console.log("response data ",data)
                setParticipants(data)
               }
            } catch (error) {
                console.log("something went wrong in getParticipants ", error);
            }
        };
    
        useEffect(() => {
           getParticipants()
        }, []);
    
    
  return (
    <div className='flex    items-center justify-center gap-x-3   mt-7 md:mt-24 lg:mt-7 mb-8 '>

<div className='w-[8rem] flex flex-col items-center bg-zinc-900 py-2  rounded-lg'>
        <p className='font-semibold opacity-40 text-[10px]'>SINCE</p>
        <p className='font-bold text-[10px] '>29 Aug 2023</p>
        </div>

       <div className='w-[8rem]  flex flex-col items-center bg-zinc-900 py-2 rounded-lg'>
        <p className='font-semibold opacity-40 text-[10px]'>PARTICIPANTS</p>
        <p className='font-bold text-[10px]'>{participants}</p>
        </div>

        <div className='w-[8rem]  flex flex-col items-center bg-zinc-900 py-2 rounded-lg'>
        <p  className='font-semibold opacity-40 text-[10px]'>TOTAL INCOME</p>
        <p className='font-bold text-[10px]'>{totalIncome} USDT</p>
       </div>
    </div>
  )
}

export default MobStatistics;