"use client";
import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const B_Network_Address = "0xe34603D9A35A1117edd66901B022b0b5388d034F";
const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";

const provider = new ethers.providers.JsonRpcProvider(rpc);
export const signer = provider.getSigner();

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
