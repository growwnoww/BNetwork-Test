"use client";
import useLatestPlanet from "@/Hooks/useLatestPlanet";
import { Context } from "@/components/Context";
import UserInfo from "@/components/clientcomponents/UserInfo";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import { ethers } from "ethers";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import ClubAABI from '../../../contract/ClubAContract/ClubA_ABI.json'
import PlanetUpgrade_ABI from '@/contract/BNetwork_ABI.json'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { SelectPlan } from "@/utils/SelectPlan";
import { PlanetUpgrade_Address } from "@/contract/Web3_Instance";
import { clubA_Address } from "@/contract/ClubAContract/ClubA_Instance";

interface userDetailsInfo {
    bn_id: string;
    reg_user_address: string;
    latestPlanetName: string;
}


interface valueType {
    Plan: string;

}



const ProfileAvatar = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    // const host = window.location.hostname;
    const walletContext = useContext(WalletContext);
    // const userAddress = walletContext?.userAddress;
    const [userDetails,setUserDetails] = useState<userDetailsInfo>()
    const [userAvatar,setUserAvatar] = useState("just_reg")
    const {walletProvider} = useWeb3ModalProvider()
    const [value,setValue] = useState<valueType>({Plan:"CosMos Network"})
let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }
      
    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectPlanChange = (selectedLevel: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            Plan: selectedLevel,
        }));
    };

    const getPlanetName = (planetId: number): string | undefined => {
      const planetNames: { [id: number]: string } = {
        0:"just_reg",
        1: "Earth 10$",
        2: "Moon 25$",
        3: "Mars 50$",
        4: "Mercury 100$",
        5: "Venus 250$",
        6: "Jupiter 500$",
        7: "Saturn 1000$",
        8: "Uranus 2500$",
        9: "Neptune 5000$",
        10: "Pluto 10000$",
      };
  
      return planetNames[planetId];
    };
  

    const getUserLatestPlanet = async (regAddress:any)=>{
      try {
        let contractAddress = PlanetUpgrade_Address;
        let contract_ABI = PlanetUpgrade_ABI;
        if(value.Plan == "CosMos Network"){
             contractAddress = PlanetUpgrade_Address;
             contract_ABI = PlanetUpgrade_ABI;
        }
        else if(value.Plan == "Club-A"){
            console.log("Club A",clubA_Address)
            contractAddress = clubA_Address;
            contract_ABI = ClubAABI;
        }
        const provider = new ethers.providers.Web3Provider(walletProvider as any);
        const signer = provider.getSigner();
        const Contract_Instance = new ethers.Contract(contractAddress,contract_ABI,signer)
        console.log("reg Address",regAddress)

        const planetId = await Contract_Instance.getPackage(regAddress);
        console.log("planet Id",planetId)
       const lastPlanetBuyTimeInNumber =
         ethers.BigNumber.from(planetId).toNumber();
       console.log("lastPlanetBuyTimeInNumber", lastPlanetBuyTimeInNumber);
 
  
       
       const planetName = getPlanetName(lastPlanetBuyTimeInNumber)
       console.log("planet Name",planetName)
       const planetNameonly = planetName!.split(" ")[0];
       console.log("planet name only",planetNameonly)
       setUserAvatar(planetNameonly)
      } catch (error) {
       console.log("something went wrong in getUserPlanet method",error)
      }
   }

   


    const getUserDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL}/user/getUserInfo/${userAddress?.toLowerCase()}`
            );
            if (response.data) {
                const data: userDetailsInfo = await response.data;
                console.log("User detail from get req ", data);
                setUserDetails(data);
            } else {
                throw new Error(`HTTP error! status: res} $`);
            }
        } catch (error) {
            console.log("something went wrong in getUserDetails", error);
        }
    };

    useEffect(() => {
        getUserDetails();

        getUserLatestPlanet(userAddress)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress,value.Plan, query]);

    return (
        <>
            <div className=" flex flex-col items-center justify-center  w-full h-full">
            <div className="w-full flex justify-start items-start text-white ">
                        <Select
                          name="selectTieTeamLevels"
                          value={value.Plan}
                          onValueChange={handleSelectPlanChange}
                        >
                          <SelectTrigger className="w-[180px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent defaultValue="CosMos Network">
                            {SelectPlan.map((item: any) => (
                              <SelectItem key={item.id} value={item.value}>
                                {item.data}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                <Image src={`/${userAvatar}.png`} alt="Pluto.png" loading="lazy" height={300} width={300} />
            </div>

            <div
                onClick={() =>
                    copyToClipboard(`https://www.bnetwork.space//registration?rr=${userAddress?.toLowerCase()}`)
                }
                className="flex cursor-pointer items-center justify-center gap-x-3 w-auto lg:w-full bg-yellow-500 rounded-md px-[20%] sm:px-28 md:px-16 py-1"
            >
                <p>Referrel link </p>
                <span>
                    <FaRegCopy />
                </span>
            </div>
            <div className="pt-5 lg:w-full">
                <UserInfo currentPackage = {userAvatar}/>
            </div>
        </>
    );
};

export default ProfileAvatar;
