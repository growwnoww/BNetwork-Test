import { bNetwork } from "@/contract/Web3_Instance";

import { useEffect, useState } from "react"
import { useAccount } from "wagmi";






const useUserDetails = () =>{
    const [isUserRegister,setUserRegister] = useState<boolean>(false);
    const {address,isConnected} = useAccount();
    const userAddress = address; 
    
 

    const getUserDetails = async () =>{
        try {
            
            if(!userAddress || !isConnected){
                return;
            }

            const MyContract = bNetwork();

            const exists =  await MyContract!.isUserExists(userAddress);
           
          
            if(exists){
              setUserRegister(true)
                
            }
        } catch (error) {
            console.log("Something went wrong in getUserDetails ",error)
        }
    }

    
    useEffect(() =>{
        getUserDetails();
    },[userAddress])

    return isUserRegister;
}

export default useUserDetails;
