import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useEffect, useState, useCallback, useContext } from "react";
import BNetworkABI from "@/contract/BNetwork_ABI.json";
import { WalletContext } from "@/context/WalletContext";

const useOwner = (): string => {
    const walletContext = useContext(WalletContext);
    const [ownerContract, setOwnerContract] = useState<string>('');
    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

    const getOwner = useCallback(async () => {
        try {
            // const MyContract = BNetwork();
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            if (!BNetworkContract) {
                console.error("Contract not initialized");
                return;
            }

            const ownerAddress = await BNetworkContract.owner();
            console.log(ownerAddress);
            setOwnerContract(ownerAddress);
        } catch (error) {
            console.error("Something went wrong in useOwner Hook", error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getOwner();
    }, [getOwner]);

    return ownerContract;
};

export default useOwner;
