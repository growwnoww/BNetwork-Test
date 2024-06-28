"use client";
import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import React, { useContext, useEffect, useState } from "react";
import BtnWrapper from "@/components/WrapperComponent/BtnWrapper";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { IoIosUnlock } from "react-icons/io";
import { ethers } from "ethers";
import { PlanetUpgrade_Address } from "@/contract/Web3_Instance";
import BNetwork_ABI from "@/contract/BNetwork_ABI.json"
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";

const Planetupgradediv = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

    const walletContext = useContext(WalletContext);
    const {walletProvider} = useWeb3ModalProvider()
    let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }
    const [planetCount, setPlanetCount] = useState<number>(0);

    const getCurrentPlanetStatus = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(walletProvider as any);
          const signer = provider.getSigner();
          const clubAMainContract = new ethers.Contract(PlanetUpgrade_Address,BNetwork_ABI , signer);
          const clubACont = clubAMainContract;
          console.log("club A ",clubACont)
          const isUserExist = await clubACont!.UserRegister(userAddress);
    
          if (!isUserExist) {
            setPlanetCount(0);
            return;
          }
    
          const currentPlanet = await clubACont!.getPackage(userAddress);
          console.log("currentpLnaet", currentPlanet);
    
          if (typeof currentPlanet === "undefined") {
            throw new Error("Unable to retrieve current planet.");
          }
    
          let planetBoughtNumber = ethers.BigNumber.from(currentPlanet).toNumber();
          console.log("planetBoughtNumber", planetBoughtNumber);
    
          setPlanetCount(planetBoughtNumber);
        } catch (error) {
          console.log("something went wrong in getCurrentPlanetStatus", error);
          throw error; // Propagate the error
        }
      };

    useEffect(() => {
        getCurrentPlanetStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress, query]);

    return (
        <div className="bg-[#1f1f1f] flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-between py-8 m-3 rounded-md">
            <div className="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl  px-3"> CosMos Network</div>
            <div className="flex flex-col lg:flex-row gap-y-6  items-center justify-center gap-x-9 mx-10">
                <div className="h-fit grid grid-cols-5 w-fit  gap-x-2 ">
                    {levels.map((index) => (
                        <LevelIcon
                            key={index}
                            level={index}
                            id={`planetUpgrade-level-${index + 1}`}
                            context="planetUpgrade"
                            planetCount={planetCount}
                        />
                    ))}
                </div>
                <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              path="/dashboard/bnsystem/planetupgrade"
            />
          </div>
            </div>
        </div>
    );
};

export default Planetupgradediv;
