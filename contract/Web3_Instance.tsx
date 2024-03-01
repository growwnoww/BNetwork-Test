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
const USDT_Address = "0xf2B0F372c7A68142C248A983f863870f37B0829a";
const rpc = "https://data-seed-prebsc-2-s3.bnbchain.org:8545";

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
