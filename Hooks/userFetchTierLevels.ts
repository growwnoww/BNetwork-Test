import { WalletContext } from '@/context/WalletContext';
import React, { useContext, useEffect, useState } from 'react'

export interface tierTeamDataType{
    _id:string;
    bn_id:string;
    reg_user_address:string;
    reg_time:string;
    upline_referral_BNId:string;
    latestPlanetName:string;
    isStatus:string;
    tierEarnings:boolean;
}


const userFetchTierLevels = (userAddress:string | undefined): tierTeamDataType[][] => {
    

    const[fetchTierData,setFetchTierData] = useState<tierTeamDataType[][]>();

    useEffect(()=>{
      
        const fetchTierTeamData = async()=>{
            const maxLevel = 15;
            let allLevelsData: tierTeamDataType[][] = [];
            
            for(let level=1;level<=maxLevel;level++){
                const url =  `${process.env.NEXT_PUBLIC_URL}/user/getTierUserlevel/${userAddress?.toLowerCase()}/${level}`

                try {
                    const response = await fetch(url);
                    if (response.ok) {
                      const data: tierTeamDataType[] = await response.json();
                      allLevelsData[level] = data; // Store data for each level
                    } else {
                      console.error(`HTTP error! status: ${response.status}`);
                      allLevelsData[level] = []; // Ensure we always have an entry for each level, even if empty
                    }
                  } catch (error) {
                    console.error("Something went wrong", error);
                    allLevelsData[level] = []; // Handle errors by setting an empty array for the level
                  }
                }
                 console.log("Tier data ",allLevelsData)
                setFetchTierData(allLevelsData); // Update state with all fetched data at once
            }

            if(userAddress){
                fetchTierTeamData();
            }

        },[userAddress])


    return fetchTierData!
}

export default userFetchTierLevels