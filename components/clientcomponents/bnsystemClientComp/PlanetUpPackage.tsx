"use client";
import Image from "next/image";
import React, { useState } from "react";
import "../../../app/globals.css";
import Link from "next/link";
import { bNetwork, signer } from "@/contract/Web3_Instance";
import { FaUnlockAlt, FaUserLock } from "react-icons/fa";
import { FcLock, FcUnlock } from "react-icons/fc";
import { ethers } from "ethers";
import Token_ABI from "@/contract/Token_ABI.json";

interface PlanetUpPropsTypes {
    imgURL: string;
    packageName: string;
    packagePrice: number;
    treePath: string;
    chartPath: string;
}

const PlanetUpPackage = ({ imgURL, packageName, packagePrice, treePath, chartPath }: PlanetUpPropsTypes) => {
    const [isApprove, setApprove] = useState<boolean>(false);
    const [planetBuy, setPlanetBuy] = useState<boolean>(false);

    const approveUSDT = async () => {
        try {
            const gasPrice = await signer.getGasPrice();
            const myContract = bNetwork();
            const getFeeTokenAddress = await myContract.getFeeToken();
            const secondInstance = new ethers.Contract(getFeeTokenAddress, Token_ABI, signer);
            const planetName =
                packageName === "Earth"
                    ? "5000000000000000000"
                    : packageName === "Moon"
                    ? "10000000000000000000"
                    : packageName === "Mars"
                    ? "25000000000000000000"
                    : packageName === "Mercury"
                    ? "50000000000000000000"
                    : packageName === "Venus"
                    ? "100000000000000000000"
                    : packageName === "Jupiter"
                    ? "250000000000000000000"
                    : packageName === "Saturn"
                    ? "500000000000000000000"
                    : packageName === "Uranus"
                    ? "1000000000000000000000"
                    : packageName === "Neptune"
                    ? "2500000000000000000000"
                    : packageName === "Pluto"
                    ? "5000000000000000000000"
                    : "5000000000000000000";
            const approve = await secondInstance.approve(myContract.address, planetName, {
                gasPrice: gasPrice,
                gasLimit: "200000",
            });
            await approve.wait();
            console.log(approve);
            setApprove(true);
        } catch (error) {
            console.log(error);
        }
    };

    const buyPlanetUser = async () => {
        try {
            const gasPrice = await signer.getGasPrice();

            const myContract = bNetwork();

            const planetId =
                packageName === "Earth"
                    ? "1"
                    : packageName === "Moon"
                    ? "2"
                    : packageName === "Mars"
                    ? "3"
                    : packageName === "Mercury"
                    ? "4"
                    : packageName === "Venus"
                    ? "5"
                    : packageName === "Jupiter"
                    ? "6"
                    : packageName === "Saturn"
                    ? "7"
                    : packageName === "Uranus"
                    ? "8"
                    : packageName === "Neptune"
                    ? "9"
                    : packageName === "Pluto"
                    ? "10"
                    : "null";
            console.log(planetId);
            const buyPlanet = await myContract.buyPlannet(planetId, {
                gasPrice: gasPrice,
                gasLimit: "200000",
            });
            await buyPlanet.wait();
            console.log(buyPlanet);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative z-0  flex flex-col bg-zinc-800 rounded-md  m-2 mx-5">
            <div className=" flex items-center justify-between w-full px-2 py-3 ">
                <div className="text-xl flex items-start justify-start">
                    <p>
                        {packageName} <span>{packagePrice}$</span>
                    </p>
                </div>
            </div>

            <div className="z-10 absolute top-[39%] right-[30%] flex flex-col items-center text-xl font-semibold">
                {planetBuy ? (
                    ""
                ) : (
                    <span className="text-3xl">
                        <FaUserLock />
                    </span>
                )}

                {planetBuy ? (
                    ""
                ) : (
                    <div>
                        {isApprove ? (
                            <button className="bg-yellow-500 py-1 px-5  rounded-md hover:bg-yellow-600 duration-300">
                                <span
                                    className="bg-yellow-500 py-1 px-5 flex  items-center gap-x-1  rounded-md hover:bg-yellow-600 duration-300"
                                    onClick={buyPlanetUser}
                                >
                                    Upgrade
                                </span>
                            </button>
                        ) : (
                            <button
                                className="bg-yellow-500 py-1 px-5  rounded-md hover:bg-yellow-600 duration-300"
                                onClick={approveUSDT}
                            >
                                Approve
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center bg-black  py-10 px-10 opacity-40 blur-[2px]">
                <Image
                    src={imgURL}
                    alt={imgURL}
                    height={packageName == "Saturn" ? 250 : 150}
                    width={packageName == "Saturn" ? 250 : 150}
                    loading="lazy"
                    className={`${packageName == "Saturn" ? "" : "custom-spin"}`}
                />
            </div>

            <div className="flex items-center justify-center py-3">
                {planetBuy ? (
                    <div className="flex flex-col items-center gap-y-1">
                        <Link
                            href={chartPath}
                            className="bg-yellow-500 py-1 px-5 flex  items-center gap-x-1  rounded-md hover:bg-yellow-600 duration-300"
                        >
                            <span>View tree</span>
                        </Link>
                    </div>
                ) : (
                    <div className="flex  items-center gap-y-1 gap-x-2"></div>
                )}
            </div>
        </div>
    );
};

export default PlanetUpPackage;
