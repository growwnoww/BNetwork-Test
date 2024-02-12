"use client";
import React, {  useEffect, useState } from "react";
import { FaDirections, FaRegCopy } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import { Context } from "../Context";
import { bNetwork } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import useOwner from "@/Hooks/useOwner";
import useUserDetails from "@/Hooks/useUserDetails";

interface userDetailsInfo{
    bn_id: string,
    reg_user_address: string,
    reg_time: string,
    upline_referral_address: string,
    upline_referral_BNId:string
    direct_count: number
}

const UserInfo = () => {
 
    const {address} = useAccount();
    const userAddress = address;
    const ownerContract = useOwner();
    console.log(ownerContract)
    

    const [userDetails,setUserDetails] = useState<userDetailsInfo>();

    const [packageFee, setPackageFee] = useState<any>();

    const copyToClipboard = (text: any): void => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };



    const getUserDetails = async () =>{

        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/getUserDetails?reg_user_address=${address}`)
            if(response){
                const data:userDetailsInfo = await response.json();
                console.log("User detail from get req ",data);
                setUserDetails(data);
            }
            else{
                throw new Error(`HTTP error! status: res} $`);

            }
        } catch (error) {
            console.log("something went wrong in getUserDetails",error)
        }
    }

    const userPlanet = async () => {
        try {
            const myContract = bNetwork();
            const planet = await myContract!.UserPlannet(userAddress);
            const num = Number(planet?._hex);
            const plannetDetails = await myContract!.MatrixDetails(num);
            setPackageFee(Number(ethers.utils.formatEther(plannetDetails?.fee?._hex)).toFixed(0));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
    
        userPlanet();
        getUserDetails();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="md:text-sm">
            <div className="bg-black py-4 my-2 sm:w-96  md:w-auto  px-3  rounded-md md:text-sm">
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">My Address: </span>
                        <span className="text-md">{`${userAddress?.slice(0, 8)}...${userAddress?.slice(
                            userAddress?.length - 8,
                            userAddress?.length
                        )}`}</span>
                    </div>
                    <div>
                        <FaRegCopy className="cursor-pointer" onClick={() => copyToClipboard(userAddress)} />
                    </div>
                </div>

                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">My BN ID: </span>
                        <span>{ userDetails? `${userDetails.bn_id}` : "NA"}</span>
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
                    <div>
                        <span className="text-zinc-500">Current Package : </span>
                        <span className="md:text-xs">{`$ ${packageFee}(${
                            packageFee === "5"
                                ? "Earth"
                                : packageFee === "10"
                                ? "Moon"
                                : packageFee === "25"
                                ? "Mars"
                                : packageFee === "50"
                                ? "Mercury"
                                : packageFee === "100"
                                ? "Venus"
                                : packageFee === "250"
                                ? "Jupiter"
                                : packageFee === "500"
                                ? "Saturn"
                                : packageFee === "1000"
                                ? "Uranus"
                                : packageFee === "2500"
                                ? "Neptune"
                                : packageFee === "5000"
                                ? "Pluto"
                                : "NO"
                        })`}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() =>
                                copyToClipboard(
                                    `$ ${packageFee}(${
                                        packageFee === "5"
                                            ? "Earth"
                                            : packageFee === "10"
                                            ? "Moon"
                                            : packageFee === "25"
                                            ? "Mars"
                                            : packageFee === "50"
                                            ? "Mercury"
                                            : packageFee === "100"
                                            ? "Venus"
                                            : packageFee === "250"
                                            ? "Jupiter"
                                            : packageFee === "500"
                                            ? "Saturn"
                                            : packageFee === "1000"
                                            ? "Uranus"
                                            : packageFee === "2500"
                                            ? "Neptune"
                                            : packageFee === "5000"
                                            ? "Pluto"
                                            : "NO"
                                    })`
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <p className="py-2">My Upline: </p>
            <div className="bg-black py-4   px-3 rounded-md ">
                <div className="flex items-center justify-between pb-1 ">
                    <div>
                        <span className="text-zinc-500">Upline BN ID: </span>
                        <span>{userDetails ? `${userDetails.upline_referral_BNId}`: "NA"}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(userDetails ? `${userDetails.upline_referral_BNId}`: "NA")}
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
                            onClick={() => copyToClipboard(userDetails?.upline_referral_address)}
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
                        <span className="text-zinc-500 text-xl md:text-sm lg:text-xl font-bold">Direct Team: </span>
                        <span className="md:text-sm ">
                          {userDetails?.direct_count}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-x-1">
                        <span>
                            <GiTeamDowngrade />
                        </span>
                        <span className="text-zinc-500 text-xl font-bold">Total Team : </span>
                        <span>NA</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
