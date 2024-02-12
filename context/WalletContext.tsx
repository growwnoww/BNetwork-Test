import React, { useEffect, useState ,createContext} from "react";

import { useAccount } from "wagmi";

interface walletContextType {
  userAddress: string | undefined;
  setUserAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  userBalance: string | undefined;
  setUserBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const WalletContext = createContext<walletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userAddress, setUserAddress] = useState<string | undefined>();
  const [userBalance, setUserBalance] = useState<string | undefined>();
  const { address, isConnected } = useAccount();

  useEffect(() =>{
    if(isConnected && address){
        setUserAddress(address);
    }
  },[address,isConnected])

  return (
    <WalletContext.Provider value = {{userAddress,setUserAddress,userBalance,setUserBalance}}>
    {children}
    </WalletContext.Provider>
  )
};


