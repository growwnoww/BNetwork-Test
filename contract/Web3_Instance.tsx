"use client";
import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";
import USDBABI from "./USDTABI.json";
import EToken_ABI from "./Token_ABI.json";
import { sign } from "crypto";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";
const USDT_Address = "0x55d398326f99059ff775485246999027b3197955";
const EnergyToken_Address = "0xE9Fd094111F6A79b08737058B0BF736B41BAB619";


// const B_Network_Address = "0x04DADba64bc3D2A8e843D17086582b631765eAcB";
// const USDT_Address = "0xf2B0F372c7A68142C248A983f863870f37B0829a";
// const EnergyToken_Address = "0x9A7A2F80FD5Cf89209EC40192f481005cA3A779d"



// const provider = new ethers.providers.Web3Provider(window.ethereum);
// export const signer = provider.getSigner();

export const bNetwork = () => {
    try {
        if (typeof window !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const bNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            return bNetworkContract;
        }
    } catch (error) {
        console.error("Error creating bNetwork contract:", error);
        throw error;
    }
};

export const usdtTokenSC = () => {
    try {
        if (typeof window !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const usdbContract = new ethers.Contract(USDT_Address, USDBABI, signer);
            return usdbContract;
        }
    } catch (error) {
        console.log("Error in creating USDT contract", error);
    }
};

export const etTokenSC = () =>{
    try{
        if(typeof window !== "undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const etContract = new ethers.Contract(EnergyToken_Address,EToken_ABI,signer)
            return etContract;
        }
    }catch(error){
        console.log("Error in creating Energy Token contract",error)
    }
}
