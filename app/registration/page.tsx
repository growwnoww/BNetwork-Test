"use client";
import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { BNetwork } from "@/contract/Web3_Instance";

import { IoMdPlanet } from "react-icons/io";
import { TbCards, TbUniverse } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/main/Navbar";
import axios from "axios";

import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import { useRouter } from "next/navigation";

interface userDetailsType {
    regUser: string;
    regTime: string;
    regId: number;
    regReferal: string;
    regReferalId: number;
    teamCount: number;
}

const Page = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Yes");
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [inviteAddress, setInviteAddress] = useState<string>("");
    const params = useSearchParams();
    const queryUrl = params.get("rr");

    const router = useRouter();

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const isUserPresent = async (e: FormEvent) => {
        try {
            e.preventDefault();
            console.log("upline address", inviteAddress);
            const MyContract = BNetwork();

            const isUplineExist = await MyContract!.isUserExists(inviteAddress);

            if (!isUplineExist) {
                alert("Upline doesnt' exist, use correct upline address");
                return;
            }

            router.push(`/registration/${inviteAddress}`);
        } catch (error) {
            console.log("something went wrong in isUserPresent ", error);
        }
    };

    useEffect(() => {
        if (queryUrl) {
            setInviteAddress(queryUrl);
        }
    }, [queryUrl]);

    return (
        <>
            <Navbar />
            <div className=" mt-20 w-full h-screen  rounded-md bg-neutral-950 relative ">
                <div className=" p-4 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-y-5 lg:gap-y-1 ">
                    <div className=" px-5 order-2 lg:order-1 lg:ml-10">
                        <div className="grid grid-cols-2  gap-x-3 gap-y-3 ">
                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex items-center gap-x-3">
                                        <IoMdPlanet className="text-6xl text-yellow-400" />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">
                                            Planet Upgarade System
                                        </h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        Register with a referral link, then you have a better chance that the people you
                                        invite will register strictly by your link.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>

                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full  rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex  items-center gap-x-3">
                                        <TbCards className="text-6xl text-yellow-400" />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">
                                            BN NFT Royalty
                                        </h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        By participating in the program, you get profit and maintain the balance of
                                        our BNS Eco system.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>

                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex  items-center gap-x-3">
                                        <TbUniverse className="text-6xl text-yellow-400" />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">
                                            Universe Club- A, B & C
                                        </h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        The Universe is the heart of our BNS Eco-System, its core layer, a
                                        simulation of real life.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>

                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex  items-center gap-x-3">
                                        <Image src="/b-coin.png" alt="bncoin" height={55} width={55} />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">BN Coin</h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        By participating In the BNetwork Space Eco-System, You will get all Profit in BN
                                        Coin For Increase Utilities.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full order-1 lg:order-2  max-w-lg mx-auto  bg-zinc-900 rounded-lg shadow-lg p-8 z-10">
                        <h2 className="text-2xl lg:text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
                            Registration For Believe Network
                        </h2>
                        <div className="mb-10">
                            <p className="text-gray-400 text-center">Do you already have an Upline?</p>
                            <div className="flex justify-around mt-4">
                                {["Yes", "No"].map((option) => (
                                    <button
                                        key={option}
                                        className={classNames(
                                            "text-lg font-semibold py-2 px-6 rounded-full transition-all duration-300",
                                            {
                                                "bg-yellow-500 hover:bg-yellow-700 text-white":
                                                    selectedOption === option,
                                                "bg-gray-700 text-gray-300": selectedOption !== option,
                                            }
                                        )}
                                        onClick={() => handleOptionChange(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedOption === "Yes" ? (
                            <form className="space-y-4  " onSubmit={(e) => isUserPresent(e)}>
                                <div className="flex flex-col py-4">
                                    <label htmlFor="bnId" className="text-gray-400 mb-2">
                                        Enter Upline Address
                                    </label>
                                    <input
                                        id="bnId"
                                        onChange={(e) => setInviteAddress(e.target.value)}
                                        value={(queryUrl as string) || inviteAddress}
                                        type="text"
                                        className="bg-gray-800 text-white rounded-lg p-3 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="Upline  Address"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300"
                                >
                                    Verify Upline
                                </button>
                            </form>
                        ) : (
                            <Link href="/signup">
                                <button className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300">
                                    Sign up
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <BackgroundBeams />
            </div>
        </>
    );
};

export default Page;
