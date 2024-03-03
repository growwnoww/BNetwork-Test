"use client";
import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";
import USDBABI from "./USDTABI.json";
import { sign } from "crypto";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";
const USDT_Address = "0x55d398326f99059ff775485246999027b3197955";






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
