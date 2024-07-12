"use client";
import { PlanetUpgrade_Address, PlanetUprade_ABI } from '@/contract/Web3_Instance';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'

function Statistics() {

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
    <div  className='flex flex-col gap-y-4  lg:flex-row items-center justify-center gap-x-3 w-full mt-7 md:mt-24 lg:mt-7 mb-8 lg:mx-2'>

<div className='w-full flex flex-col items-center bg-zinc-900 py-5 rounded-lg'>
        <p className='font-semibold opacity-40'>Since</p>
        <p className='font-bold text-2xl'>29 August 2023</p>
        </div>

       <div className='w-full flex flex-col items-center bg-zinc-900 py-5 rounded-lg'>
        <p className='font-semibold opacity-40'>PARTICIPANTS</p>
        <p className='font-bold text-2xl'>{participants}</p>
        </div>

        <div className='w-full flex flex-col items-center bg-zinc-900 py-5 rounded-lg'>
        <p className='font-semibold opacity-40'>TOTAL INCOME</p>
        <p className='font-bold text-2xl'>{totalIncome} USDT</p>
       </div>
    </div>
  )
}

export default Statistics