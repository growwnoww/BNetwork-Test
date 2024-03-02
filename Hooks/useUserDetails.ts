import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { bNetwork } from "@/contract/Web3_Instance";

const useUserDetails = () => {
    const [isUserRegister, setUserRegister] = useState<boolean>(false);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                if (!address || !isConnected) {
                    setUserRegister(false); // Ensure user is marked as not registered if disconnected
                    return;
                }

                const MyContract = bNetwork();
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
