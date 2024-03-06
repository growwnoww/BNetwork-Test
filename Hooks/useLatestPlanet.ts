"use client";

import { BNetwork } from '@/contract/Web3_Instance';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'

const useLatestPlanet = () => {

    const [planetCount, setPlanetCount] = useState<number>(0)
    const { address, isConnected } = useWeb3ModalAccount();

    const getUserPlanetCount = async () => {
        try {
            if (!address || !isConnected) {
                setPlanetCount(0); // Ensure user is marked as not registered if disconnected
                return;
            }

            const MyContract = BNetwork();
            console.log("user address before plannet count", address)
            const planetCount = await MyContract!.userPlannet(address);
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