import { ethers } from "ethers";
import BNetworkABI from "./BNetwork_ABI.json";
import Token_ABI from "./Token_ABI.json";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const ETToken_Address = "0x939fDf8d411a0f110Bbec4a98220cBc01553d01b";
const USDTToken_Address = "0x939fDf8d411a0f110Bbec4a98220cBc01553d01b";
const B_Network_Address = "0xAE521258c29B67262F5128c10c25741C7327ee5a";

const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export const etToken = () => {
    const etTokenContract = new ethers.Contract(ETToken_Address, Token_ABI, signer);
    return etTokenContract;
};

export const usdtToken = () => {
    const usdtTokenContract = new ethers.Contract(USDTToken_Address, Token_ABI, signer);
    return usdtTokenContract;
};

export const bNetwork = () => {
    const bNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
    return bNetworkContract;
};
