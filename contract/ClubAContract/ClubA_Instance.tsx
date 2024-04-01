'use client';

import { ethers } from "ethers";
import ClubA_ABI from './ClubA_ABI.json'

declare global{
    interface Window{
        ethereum?:any;
    }
}

const clubA_Address = "0xdF6dFc9D54B265cE67C487e5c9F3C7A7a7bce9D8";


export const clubAContract = () =>{
    try {
        if(typeof window !== "undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const clubAContract = new ethers.Contract(clubA_Address,ClubA_ABI,signer);

            return clubAContract
        }
    } catch (error) {
        console.error("Error creating bNetwork contract:", error);
    }
}