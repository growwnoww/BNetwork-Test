"use client";
import Image from "next/image";
import React, { useState } from "react";
import "../../../app/globals.css";
import Link from "next/link";
import { bNetwork, signer } from "@/contract/Web3_Instance";

interface PlanetUpPropsTypes {
    imgURL: string;
    packageName: string;
    packagePrice: number;
    treePath: string;
    chartPath: string;
}

const PlanetUpPackage = ({ imgURL, packageName, packagePrice, treePath, chartPath }: PlanetUpPropsTypes) => {
    const [value, setValue] = useState<string>();
    const buyPlanetUser = async () => {
        try {
            const signers = signer;
            const gasPrice = await signers.getGasPrice();

            const myContract = bNetwork();
            const buyPlanet = await myContract.buyPlannet(value, {
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
                <span className="text-3xl">{packagePrice}$</span>
                <button
                    className="bg-yellow-500 py-2 px-8  rounded-md hover:bg-yellow-600 duration-300"
                    onClick={() => {
                        setValue(
                            `${
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
                                    : "NO"
                            }`
                        );
                        buyPlanetUser();
                    }}
                >
                    Activate
                </button>
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

            <div className="flex items-center justify-between px-4 w-full gap-x-3 py-3  text-md">
                <Link href={chartPath} className="bg-yellow-500 py-2 px-5  rounded-md hover:bg-yellow-600 duration-300">
                    View Chart
                </Link>
                <Link href={treePath} className="bg-yellow-500 py-2 px-5 rounded-md hover:bg-yellow-600 duration-300">
                    View Tree
                </Link>
            </div>
        </div>
    );
};

export default PlanetUpPackage;
