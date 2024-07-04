"use client";
import { PlanetUpgrade_Address, PlanetUprade_ABI } from '@/contract/Web3_Instance';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'

function Statistics() {

    const[participants,setParticipants] = useState<number | null>(0)
    const [totalIncome,setTotalIncome] = useState<number | null>(323560)
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);


    
        const initializeWalletProvider = async () => {
            const web3Modal = new Web3Modal({
                cacheProvider: true, // optional
                providerOptions: {}, // required
            });
    
            try {
                const instance = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(instance);
                setProvider(provider);
                console.log("Wallet provider initialized", provider);
            } catch (error) {
                console.error("User denied account access or error occurred", error);
            }
        };
    
        useEffect(() => {
            initializeWalletProvider();
        }, []);
    
        const getParticipants = async () => {
            try {
                if (!provider) {
                    throw new Error("provider is undefined or not initialized");
                }
    
                const signer = provider.getSigner();
                const planetUpgradeContract = new ethers.Contract(PlanetUpgrade_Address, PlanetUprade_ABI, signer);
                console.log("contract", planetUpgradeContract);
    
                const getRawValue = await planetUpgradeContract.regCounter();
                const totalUser = ethers.BigNumber.from(getRawValue).toNumber();
                console.log("totalUser ", totalUser);
                setParticipants(totalUser);
            } catch (error) {
                console.log("something went wrong in getParticipants ", error);
            }
        };
    
        useEffect(() => {
            if (provider) {
                getParticipants();
            }
        }, [provider]);
    
    
  return (
    <div className='flex flex-col gap-y-4  lg:flex-row items-center justify-center gap-x-3 w-full mt-7 md:mt-24 lg:mt-7 mb-8 lg:mx-2'>

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