"use client";
import useLatestPlanet from "@/Hooks/useLatestPlanet";
import { Context } from "@/components/Context";
import UserInfo from "@/components/clientcomponents/UserInfo";
import { WalletContext } from "@/context/WalletContext";
import { clubAContract } from "@/contract/ClubAContract/ClubA_Instance";
import axios from "axios";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

interface userDetailsInfo {
    bn_id: string;
    reg_user_address: string;
    latestPlanetName:string;

  }
const ProfileAvatar = () => {

    // const host = window.location.hostname;

    const walletContext = useContext(WalletContext)
    const userAddress = walletContext?.userAddress;
    const [userDetails,setUserDetails] = useState<userDetailsInfo>()
    const [userAvatar,setUserAvatar] = useState(" ")
   

      
     


    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    const getPlanetName = (planetId: number): string | undefined => {
      const planetNames: { [id: number]: string } = {
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
       const clubACont = clubAContract();
       const planetId = await clubACont!.getPackage(regAddress)
       const lastPlanetBuyTimeInNumber =
         ethers.BigNumber.from(planetId).toNumber();
       console.log("lastPlanetBuyTimeInNumber", lastPlanetBuyTimeInNumber);
 
       if(lastPlanetBuyTimeInNumber === 0){
         return "Earth";
       }
       
       const planetName = getPlanetName(lastPlanetBuyTimeInNumber)
       const planetNameonly = planetName!.split(" ")[0];
       setUserAvatar(planetNameonly || "just_reg")
      } catch (error) {
       
      }
   }

   


    const getUserDetails = async () => {
        try {
          const response = await axios(
            `${process.env.NEXT_PUBLIC_URL}/user/getUserInfo/${userAddress?.toLowerCase()}`
          );
          if (response.data) {
            const data: userDetailsInfo = await response.data
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
    
      }, [userAddress]);

    return (
        <>
            <div className="">
                <Image src={`/${userAvatar}.png`} alt="Pluto.png" loading="lazy" height={300} width={300} />
            </div>

            <div
             onClick={() => copyToClipboard(`https://www.bnetwork.space//registration?rr=${userAddress?.toLowerCase()}`)}
            className="flex cursor-pointer items-center justify-center gap-x-3 w-auto lg:w-full bg-yellow-500 rounded-md px-[20%] sm:px-28 md:px-16 py-1">
                <p>Copy Referrel link </p>
                <span>
                    <FaRegCopy

                    />
                </span>
            </div>
            <div className="pt-5 lg:w-full">
                <UserInfo />
            </div>
        </>
    );
};

export default ProfileAvatar;
