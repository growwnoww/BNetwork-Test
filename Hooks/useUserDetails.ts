import { BNetwork } from "@/contract/Web3_Instance";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useEffect, useState } from "react";

const useUserDetails = () => {
    const [isUserRegister, setUserRegister] = useState<boolean>(false);
    const { address, isConnected } = useWeb3ModalAccount();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                if (!address || !isConnected) {
                    setUserRegister(false); // Ensure user is marked as not registered if disconnected
                    return;
                }

                const MyContract = BNetwork();
                const exists = await MyContract!.isUserExists(address);

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
