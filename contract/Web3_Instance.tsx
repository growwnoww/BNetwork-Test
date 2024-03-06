"use client";
import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";
import USDBABI from "./USDTABI.json";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";

const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";
const USDT_Address = "0x55d398326f99059ff775485246999027b3197955";

export const BNetwork = () => {
    const { walletProvider } = useWeb3ModalProvider();
    try {
        const provider = new ethers.providers.Web3Provider(walletProvider as any);
        const signer = provider.getSigner();
        const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
        return BNetworkContract;
    } catch (error) {
        console.error("Error creating BNetwork contract:", error);
        throw error;
    }
};

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
