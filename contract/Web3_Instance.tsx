import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";
import Token_ABI from "./Token_ABI.json";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const B_Network_Address = "0xe34603D9A35A1117edd66901B022b0b5388d034F";

const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export const bNetwork = () => {
    const bNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
    return bNetworkContract;
};
