'use client'
import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import React, { useEffect, useState } from "react";
import BtnWrapper from "@/components/WrapperComponent/BtnWrapper";
import { IoIosUnlock } from "react-icons/io";
import Link from "next/link";
import { ethers } from "ethers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import ClubA_ABI from '@/contract/ClubAContract/ClubA_ABI.json'

const UniverseDiv = () => {
  const {walletProvider} = useWeb3ModalProvider()
  const {address} = useWeb3ModalAccount();
  const userAddress = address;
  const [highestPlanetBought, setHighestPlanetBought] = useState<number>(0);


  const clubA_Address = "0xbBFaA594eA9728CC7811351f57c644e0f3eebe60";


  const levels1 = Array.from({ length: 10 }, (_, i) => i + 1);
  const levels2 = Array.from({ length: 10 }, (_, i) => i + 1);
  const levels3 = Array.from({ length: 10 }, (_, i) => i + 1);

  
  const getCurrentPlanetStatus = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
      const clubACont = clubAMainContract;
      console.log("club A ",clubACont)
      const isUserExist = await clubACont!.UserRegister(userAddress);

      if (!isUserExist) {
        setHighestPlanetBought(0);
        return;
      }

      const currentPlanet = await clubACont!.getPackage(userAddress);
      console.log("currentpLnaet", currentPlanet);

      if (typeof currentPlanet === "undefined") {
        throw new Error("Unable to retrieve current planet.");
      }

      let planetBoughtNumber = ethers.BigNumber.from(currentPlanet).toNumber();
      console.log("planetBoughtNumber", planetBoughtNumber);



      setHighestPlanetBought(planetBoughtNumber);

    } catch (error) {
      console.log("something went wrong in getCurrentPlanetStatus", error);
      throw error; // Propagate the error
    }
  };



  useEffect(()=>{
    getCurrentPlanetStatus()
  },[])
  

  return (
    <div className="bg-[#1f1f1f] flex flex-col lg:flex-row items-center justify-between py-8 m-3 rounded-md">
      <div className="text-2xl lg:text-3xl  px-3"> Universe Matrix System</div>

      <div>
        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-center gap-x-9 mx-10">
          <div className="flex flex-col">
            <div className="text-center py-3">Club A Matrix</div>
            <div className="h-fit grid grid-cols-5 w-fit gap-x-2 ">
            {levels1.map((index) => (
            <LevelIcon key={index} level={index } id={`universeA-level-${index + 1}`} context="universeA" planetCount={5}/>
          ))}
            </div>
          </div> 
          <div className="flex items-center relative">
           <Link href="/dashboard/bnsystem/universeclub-a">
           <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              
            />
           </Link>
            
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-center gap-x-9 mx-10">
          <div className="flex flex-col">
            <div className="text-center py-3">Club B Matrix</div>
            <div className="h-fit grid grid-cols-5 w-fit gap-x-2 ">
            {levels2.map((index) => (
            <LevelIcon key={index} level={index } id={`universeB-level-${index + 1}`} context="universeB"/>
          ))}
            </div>
          </div>
          <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              
            />
            <IoIosUnlock className="absolute right-[10%]" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-center gap-x-9 mx-10">
          <div className="flex flex-col">
            <div className="text-center py-3">Club C Matrix</div>
            <div className="h-fit grid grid-cols-5 w-fit gap-x-2 ">
            {levels3.map((index) => (
            <LevelIcon key={index} level={index } id={`universeC-level-${index + 1}`} context="universeC"/>
          ))}
            </div>
          </div>
          <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              
            />
            <IoIosUnlock className="absolute right-[10%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseDiv;
