import React, { useContext, useEffect, useState } from "react";
import { FaDirections, FaRegCopy } from "react-icons/fa";
import { GiTeamDowngrade } from "react-icons/gi";
import { Context } from "../Context";
import { bNetwork } from "@/contract/Web3_Instance";
import { ethers } from "ethers";

const UserInfo = () => {
    const { userAddress } = useContext(Context);
    const [userRegisterDetail, setUserRegisterDetail] = useState<any>();
    const [userExisit, setUserExisit] = useState<boolean>();
    const [packageFee, setPackageFee] = useState<any>();

    const copyToClipboard = (text: any): void => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    const getUserRegisterDetails = async () => {
        try {
            const myContract = bNetwork();
            const detail = await myContract!.RegisterUserDetails(userAddress);
            setUserRegisterDetail(detail);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserRegister = async () => {
        try {
            const myContract = bNetwork();
            const detail = await myContract!.UserRegister(userAddress);
            setUserExisit(detail);
        } catch (error) {
            console.log(error);
        }
    };

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
        getUserRegisterDetails();
        getUserRegister();
        userPlanet();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="md:text-sm">
            <div className="bg-black py-4 my-2 sm:w-96 md:w-auto  px-3 rounded-md md:text-sm">
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">My Address: </span>
                        <span className="text-xs">{`${userAddress?.slice(0, 8)}...${userAddress?.slice(
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
                        <span>BN{userExisit ? Number(userRegisterDetail?.regId?._hex) : "null"}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(`BN${Number(userRegisterDetail?.regId?._hex)}`)}
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
                                            : "Null"
                                    })`
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <p className="py-2">My Upline: </p>
            <div className="bg-black py-4 px-3 rounded-md">
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <span className="text-zinc-500">Upline BN ID: </span>
                        <span>BN{userExisit ? Number(userRegisterDetail?.regReferalId?._hex) : "null"}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(`BN${Number(userRegisterDetail?.regReferalId?._hex)}`)}
                        />
                    </div>
                </div>
                <hr />
                <div className="flex items-center justify-between pt-1">
                    <div>
                        <span className="text-zinc-500">Upline Wallet : </span>
                        <span className="md:text-xs">{`${userRegisterDetail?.regReferal?.slice(
                            0,
                            8
                        )}...${userRegisterDetail?.regReferal?.slice(
                            userRegisterDetail?.regReferal?.length - 8,
                            userRegisterDetail?.regReferal?.length
                        )}`}</span>
                    </div>
                    <div>
                        <FaRegCopy
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(userRegisterDetail?.regReferal)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-black py-4 px-3 mt-4 rounded-md">
                <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-x-2">
                        <span>
                            <FaDirections />
                        </span>
                        <span className="text-zinc-500 text-xl md:text-sm lg:text-xl font-bold">Direct Team: </span>
                        <span className="md:text-sm">
                            BN{userExisit ? Number(userRegisterDetail?.teamCount?._hex) : "null"}
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
                        <span>12</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
