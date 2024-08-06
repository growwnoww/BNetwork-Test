"use client";
import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";
import NFT_ABI_Path from '@/contract/NFTContract/NFT_ABI.json'
import USDBABI from "./USDTABI.json";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";

// export const PlanetUpgrade_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

export const PlanetUpgrade_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";
const USDT_Address = "0x55d398326f99059ff775485246999027b3197955";
export const PlanetUprade_ABI = BNetworkABI;
const EnergyToken_Address = "0xE9Fd094111F6A79b08737058B0BF736B41BAB619";
export const NFT_Address = "0x8B71290A1E46765C58796fEc2c7d9A0ABB3B2409";
export const NFT_ABI = NFT_ABI_Path;



export const USDTTokenSC = () => {
    const { walletProvider } = useWeb3ModalProvider();
    try {
        const provider = new ethers.providers.Web3Provider(walletProvider as any);
        const signer = provider.getSigner();
        const usdbContract = new ethers.Contract(USDT_Address, USDBABI, signer);
        return usdbContract;
    } catch (error) {
        console.log("Error in creating USDT contract", error);
    }
};

// export const etTokenSC = () =>{
//     try{
//         if(typeof window !== "undefined"){
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();
//             const etContract = new ethers.Contract(EnergyToken_Address,EToken_ABI,signer)
//             return etContract;
//         }
//     }catch(error){
//         console.log("Error in creating Energy Token contract",error)
//     }
// }
