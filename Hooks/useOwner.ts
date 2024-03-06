import { BNetwork } from "@/contract/Web3_Instance";
import { useEffect, useState, useCallback } from "react";

const useOwner = (): string => {
    const [ownerContract, setOwnerContract] = useState<string>('');

    const getOwner = useCallback(async () => {
        try {
            const MyContract = BNetwork();
            if (!MyContract) {
                console.error("Contract not initialized");
                return;
            }

            const ownerAddress = await MyContract.owner();
            console.log(ownerAddress);
            setOwnerContract(ownerAddress);
        } catch (error) {
            console.error("Something went wrong in useOwner Hook", error);
        }
    }, []);

    useEffect(() => {
        getOwner();
    }, [getOwner]);

    return ownerContract;
};

export default useOwner;
