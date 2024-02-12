import { bNetwork } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react"
import { useAccount } from "wagmi";


export interface userDetailsType{
    regUser :string;
    regTime:any;
    regId:any;
    regReferal:string;
    regReferalId:number,
    teamCount:any
}



const useUserDetails = (_userAddress:string,_trigger:number) =>{
    const [userDetails,setUserDetails] = useState<userDetailsType>();
    const {address,isConnected} = useAccount();
    const userAddress = address; 
    
    
    

 

    const getUserDetails = useCallback(async () =>{
        try {
            
            if(!userAddress || !isConnected){
                return;
            }

            const MyContract = bNetwork();

            const exists =  await MyContract!.isUserExists(userAddress);
           

            if(exists){
                const response = await MyContract!.RegisterUserDetails(userAddress);
            
                console.log("Got user details",response);

                const formattedResponse = {
                    regUser: response.regUser,
                    regTime: ethers.BigNumber.from(response.regTime).toString(), // or .toNumber() if safe
                    regId: ethers.BigNumber.from(response.regId).toNumber(),
                    regReferal: response.regReferal,
                    regReferalId: ethers.BigNumber.from(response.regReferalId).toNumber(), // Assuming this is already a number
                    teamCount: ethers.BigNumber.from(response.teamCount).toNumber(),
                  };
          

                setUserDetails(formattedResponse);

                console.log("Refined Data",formattedResponse)
            }
        } catch (error) {
            console.log("Something went wrong in getUserDetails ",error)
        }
    },[userAddress,_trigger])

    
    useEffect(() =>{
        getUserDetails();
    },[])

    return userDetails;
}

export default useUserDetails;