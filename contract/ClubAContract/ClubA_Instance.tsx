'use client';

import { ethers } from "ethers";
import ClubA_ABI from './ClubA_ABI.json'
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";

// declare global{
//     interface Window{
//         ethereum?:any;
//     }
// }

const clubA_Address = "0x96B310a2a261198E44439281f9cE6842890d9aC2";




export const clubAContract = () => {
    const { walletProvider } = useWeb3ModalProvider();
    try {
        const provider = new ethers.providers.Web3Provider(walletProvider as any);
        const signer = provider.getSigner();
        const clubAContractInstance = new ethers.Contract(clubA_Address,ClubA_ABI , signer);
        console.log("clubAcontractInstance",clubAContractInstance)
        return clubAContractInstance;
    } catch (error) {
        console.error("Error creating BNetwork contract:", error);
        throw error;
    }
};