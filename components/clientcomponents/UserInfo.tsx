"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaDirections, FaRegCopy } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import { Context } from "../Context";
import { bNetwork } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import useOwner from "@/Hooks/useOwner";
import { WalletContext } from "@/context/WalletContext";

interface userDetailsInfo {
  bn_id: string;
  reg_user_address: string;
  reg_time: string;
  upline_referral_address: string;
  upline_referral_BNId: string;
  direct_count: number;
}

const UserInfo = () => {
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const userCurrentPlanet = walletContext?.planetStatus?.latestPlanetName || ' ';
  const userDirectTeam = walletContext?.planetStatus?.direct_count || '0'
  const userTotalTeam = walletContext?.planetStatus?.totalTeamCount || '0'
  console.log("usertotal team",userTotalTeam)

  console.log("lastedPlanet",userCurrentPlanet)
  const ownerContract = useOwner();
  
  const [totalCount, setTotalCount] = useState<number>(0);

  console.log(ownerContract);

  const [userDetails, setUserDetails] = useState<userDetailsInfo>();

  const [packageFee, setPackageFee] = useState<any>();

  const copyToClipboard = (text: any): void => {
    try {
      navigator.clipboard.writeText(text);
      alert("Copied");
    } catch (error) {
      console.log(error);
    }
  };




  const getUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/getUserDetails?reg_user_address=${userAddress}`
      );
      if (response) {
        const data: userDetailsInfo = await response.json();
        console.log("User detail from get req ", data);
        setUserDetails(data);
      } else {
        throw new Error(`HTTP error! status: res} $`);
      }
    } catch (error) {
      console.log("something went wrong in getUserDetails", error);
    }
  };

  const userPlanet = async () => {
    try {
      const myContract = bNetwork();
      const planet = await myContract!.UserPlannet(userAddress);
      const num = Number(planet?._hex);
      const plannetDetails = await myContract!.MatrixDetails(num);
      setPackageFee(
        Number(ethers.utils.formatEther(plannetDetails?.fee?._hex)).toFixed(0)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userPlanet();
    getUserDetails();

  }, []);

  return (
    <div className="md:text-sm">
      <div className="bg-black py-4 my-2 sm:w-96  md:w-auto  px-3  rounded-md md:text-sm">
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-zinc-500">My Address: </span>
            <span className="text-md">{`${userAddress?.slice(
              0,
              8
            )}...${userAddress?.slice(
              userAddress?.length - 8,
              userAddress?.length
            )}`}</span>
          </div>
          <div>
            <FaRegCopy
              className="cursor-pointer"
              onClick={() => copyToClipboard(userAddress)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-zinc-500">My BN ID: </span>
            <span>{userDetails ? `${userDetails.bn_id}` : "NA"}</span>
          </div>
          <div>
            <FaRegCopy
              className="cursor-pointer"
              onClick={() => copyToClipboard(`${userDetails?.bn_id}`)}
            />
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between pt-1">
          <div >
            <span className="text-zinc-500">Current Package : </span>
            <span className="md:text-xs">{`${userCurrentPlanet} `}
            {
              userCurrentPlanet === "Earth"
                ? " 5 $"
                : userCurrentPlanet === "Moon"
                ? " 10 $"
                : userCurrentPlanet === "Mars"
                ? "25 $"
                : userCurrentPlanet === "Mercury"
                ? "50 $"
                : userCurrentPlanet === "Venus"
                ? "100 $"
                : userCurrentPlanet === "Jupiter"
                ? "250 $"
                : userCurrentPlanet === "Saturn"
                ? "500 $"
                : userCurrentPlanet === "Uranus"
                ? "1000 $"
                : userCurrentPlanet === "Neptune"
                ? "2500 $"
                : userCurrentPlanet === "Pluto"
                ? "5000 $"
                : "Empty"
            }</span>
          </div>
         
        </div>
      </div>

      <p className="py-2">My Upline: </p>
      <div className="bg-black py-4   px-3 rounded-md ">
        <div className="flex items-center justify-between pb-1 ">
          <div>
            <span className="text-zinc-500">Upline BN ID: </span>
            <span>
              {userDetails ? `${userDetails.upline_referral_BNId}` : "NA"}
            </span>
          </div>
          <div>
            <FaRegCopy
              className="cursor-pointer"
              onClick={() =>
                copyToClipboard(
                  userDetails ? `${userDetails.upline_referral_BNId}` : "NA"
                )
              }
            />
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-zinc-500">Upline Wallet : </span>
            <span className="text-md">{`${userDetails?.upline_referral_address?.slice(
              0,
              8
            )}...${userDetails?.upline_referral_address?.slice(
              userDetails?.upline_referral_address?.length - 8,
              userDetails?.upline_referral_address?.length
            )}`}</span>
          </div>
          <div className="mt-5 lg:mt-0">
            <FaRegCopy
              className="cursor-pointer"
              onClick={() =>
                copyToClipboard(userDetails?.upline_referral_address)
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-black py-4  px-3 mt-4 rounded-md">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-x-2">
            <span>
              <FaDirections />
            </span>
            <span className="text-zinc-500 text-xl md:text-sm lg:text-xl font-bold">
              Direct Team:
            </span>
            <span className="md:text-sm ">{userDirectTeam}</span>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-x-1">
            <span>
              <GiTeamDowngrade />
            </span>
            <span className="text-zinc-500 text-xl font-bold">
              Total Team :{" "}
            </span>
            <span>{userTotalTeam}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
