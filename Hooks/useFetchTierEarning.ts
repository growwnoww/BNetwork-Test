import React, { useEffect, useState } from 'react'


export interface tierEarningDataType{
    _id:string;
    bn_id:string;
    reg_user_address:string;
    reg_time:string;
    upline_referral_BNId:string;
    latestPlanetName:string;
    isStatus:string;
    tierEarnings:boolean;
}


const useFetchTierEarning = (userAddress:string | undefined):tierEarningDataType[][] => {
       
    const [fetchData,setfetchData] = useState<tierEarningDataType[][]>()

    const  getTierEarningData = async () =>{
        try {
            
            const maxLevel = 15;
            let allLevelsData: tierEarningDataType[][] = [];
            for(let i=1;i<=maxLevel;i++){
                try {
                    const queryUrl = `${process.env.NEXT_PUBLIC_URL}/user/getTierEarning/${userAddress}/${i}`

                    const response = await fetch(queryUrl);

                    if(response.ok){
                        const data: tierEarningDataType[] = await response.json();
                        allLevelsData[i] = data; // Store data for each level
                        
                    }
                    else {
                        allLevelsData[i] = []; // Ensure we always have an entry for each level, even if empty
                      }
                } catch (error) {
                    console.log("something went wrong in getTierEarningData",error)
                }  

                setfetchData(allLevelsData)

            }
            
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
       
        if(userAddress){
            getTierEarningData();
        }
    },[userAddress])

    return fetchData!
}

export default useFetchTierEarning