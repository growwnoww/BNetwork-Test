'use client'
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import React, { useEffect, useState, createContext } from "react";

interface walletContextType {
    userAddress: string | undefined;
    setUserAddressState: React.Dispatch<React.SetStateAction<string | undefined>>;
    userBalance: string | undefined;
    setUserBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
    planetStatus: any | undefined;
    setPlanetStatus: React.Dispatch<React.SetStateAction<any | undefined>>;
}

export const WalletContext = createContext<walletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userAddress, setUserAddressState] = useState<string | undefined>(() => {
        // Retrieve user address from localStorage on initial render
        const storedAddress = localStorage.getItem("userAddress");
        return storedAddress !== null ? storedAddress : undefined;
    });
    
    const [userBalance, setUserBalance] = useState<string | undefined>();
    const [planetStatus, setPlanetStatus] = useState<string | undefined>();
    const { address, isConnected } = useWeb3ModalAccount();
    console.log("🚀 ~ address:", address, isConnected);

    const setUserAddress = (address: string | undefined) => {
        // Set user address in localStorage
        if (address) {
            localStorage.setItem("userAddress", address.toLowerCase());
        } else {
            localStorage.removeItem("userAddress");
        }
        setUserAddressState(address);
    };

    const fetchUserDetail = async () => {
        try {
            console.log("user address", address);
            const queryData = `${
                process.env.NEXT_PUBLIC_URL
            }/user/getUserDetails?reg_user_address=${address?.toLowerCase()}`;
            const response = await fetch(queryData);

            if (response.ok) {
                const data = await response.json();
                console.log("User details ", data);
                setPlanetStatus(data);
            }
        } catch (error) {
            console.log("Something went wrong in fetchUserDetail", error);
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
        // Fetch user details whenever isConnected changes
        fetchUserDetail();
    }, [address, isConnected]); // Listen for changes in address and isConnected

    return (
        <WalletContext.Provider
            value={{ userAddress, setUserAddressState, userBalance, setUserBalance, planetStatus, setPlanetStatus }}
        >
            {children}
        </WalletContext.Provider>
    );
};
