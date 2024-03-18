import { useAspect } from "@react-three/drei";
import React, { useEffect, useState ,createContext} from "react";

import { useAccount } from "wagmi";

interface walletContextType {
  userAddress: string | undefined;
  setUserAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  userBalance: string | undefined;
  setUserBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
  planetStatus:any | undefined;
  setPlanetStatus:React.Dispatch<React.SetStateAction<any | undefined>>;
}

export const WalletContext = createContext<walletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userAddress, setUserAddress] = useState<string | undefined>();
  const [userBalance, setUserBalance] = useState<string | undefined>();
  const [planetStatus,setPlanetStatus] = useState<string | undefined>();
  const { address, isConnected } = useAccount();
  const [planetBuyLength,setPlanetBuyLength] = useState<number|undefined>();

  const fetchUserDetail = async () =>{
    try {
      console.log("user address",address)
      const queryData = `${process.env.NEXT_PUBLIC_URL}/user/getUserDetails?reg_user_address=${address?.toLowerCase()}`;
      const response = await fetch(queryData);
      
      if(response.ok){
        const data = await response.json();
        console.log("User details ",data)
        setPlanetStatus(data)

      }
    } catch (error) {
      console.log("Something went wrong in fetchUserDetail",error)
    }
  }

  useEffect(() =>{
    if(isConnected && address){
        setUserAddress(address);
       
    }

    fetchUserDetail()


  },[address,isConnected])

  return (
    <WalletContext.Provider value = {{userAddress,setUserAddress,userBalance,setUserBalance,planetStatus,setPlanetStatus}}>
    {children}
    </WalletContext.Provider>
  )
};


