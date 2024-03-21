import { BNetwork } from "@/contract/Web3_Instance";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";
import BNetworkABI from "@/contract/BNetwork_ABI.json";
import { ethers } from "ethers";

const useUserDetails = () => {
    const [isUserRegister, setUserRegister] = useState<boolean>(false);
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                if (!address || !isConnected) {
                    setUserRegister(false); // Ensure user is marked as not registered if disconnected
                    return;
                }

                // const MyContract = BNetwork();
                const provider = new ethers.providers.Web3Provider(walletProvider as any);
                const signer = provider.getSigner();
                const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
                const exists = await BNetworkContract.isUserExists(address);

                setUserRegister(exists);
            } catch (error) {
                console.error("Something went wrong in getUserDetails", error);
                setUserRegister(false); // Ensure user is marked as not registered in case of any error
            }
        };

        getUserDetails();
    }, [address, isConnected]); // React to changes in address and connection status

    return isUserRegister;
};

export default useUserDetails;
