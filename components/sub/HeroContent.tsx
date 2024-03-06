"use client";

import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import useUserDetails from "@/Hooks/useUserDetails";
import { WalletContext } from "@/context/WalletContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const words = [
    {
        text: "Welcome to",
        className: "text-xl md:text-3xl lg:text-5xl xl:6xl",
    },
    {
        text: "Believe",
        className:
            "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 text-xl md:text-3xl lg:text-5xl xl:6xl",
    },
    {
        text: "Network",
        className:
            "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400  text-xl md:text-3xl lg:text-5xl xl:6xl",
    },
    {
        text: "Space Ecosystem",
        className:
            "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 text-xl md:text-3xl lg:text-5xl xl:6xl",
    },
];

const HeroContent = () => {
    const walletContext = useContext(WalletContext);
    const isUserRegister = useUserDetails();

    const router = useRouter(); // Add this line

    // Add this useEffect
    useEffect(() => {
        if (isUserRegister && walletContext?.userAddress) {
            router.push("/dashboard"); // Redirect user to dashboard if they are registered
        }
    }, [isUserRegister, walletContext?.userAddress, router]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen">
            <div className="absolute top-[300px] lg:top-[100px] left-0 h-full w-full z-0">
                <video
                    muted
                    autoPlay
                    loop
                    className="w-full  md:w-auto object-cover" // Ensure video covers the whole area without being cut
                >
                    <source src="/mars_back.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="z-10 px-10 lg:p-20 mb-96 lg:mb-54 flex flex-col gap-5 justify-center items-center w-full">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex flex-col items-center justify-center h-auto w-auto ">
                        <p className="text-neutral-200 text-sm md:text-lg lg:text-xl  ">
                            A Space Where You are The First Creator
                        </p>
                        <div className="hidden lg:block">
                            <TypewriterEffectSmooth words={words} />
                        </div>
                        <div className="text-center lg:hidden text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 text-3xl font-bold md:text-3xl lg:text-5xl ">
                            Welcome To Believe Network Space Ecosystem
                        </div>
                    </div>
                </div>
                <p className="text-xs text-center md:text-lg lg:text-lg text-white">
                    It is Based On The BNB (Smart Chain) Smart Contract 100% Decentralized System.
                </p>
                <div className="z-20 md:hidden ">
                    {isUserRegister && walletContext?.userAddress ? (
                        ""
                    ) : (
                        <div className="z-10">
                            <Link href="/registration">
                                <Button className="border-2 border-yellow-500">Registration</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroContent;
