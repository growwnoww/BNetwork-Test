"use client";

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import BNetworkABI from "@/contract/BNetwork_ABI.json";

const useLatestPlanet = () => {

    const [planetCount, setPlanetCount] = useState<number>(0)
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

    const getUserPlanetCount = async () => {
        try {
            if (!address || !isConnected) {
                setPlanetCount(0); // Ensure user is marked as not registered if disconnected
                return;
            }

            // const MyContract = BNetwork();
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            const planetCount = await BNetworkContract.userPlannet(address);
            const numberFormat = ethers.BigNumber.from(planetCount).toNumber()
            console.log("user planet count", numberFormat)

            setPlanetCount(planetCount);
        } catch (error) {
            console.error("Something went wrong in getUserDetails", error);
            setPlanetCount(0);
        }
    }


    useEffect(() => {
        getUserPlanetCount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    return planetCount;
}



export default useLatestPlanet