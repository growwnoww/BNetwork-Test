"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import useUserDetails from "@/Hooks/useUserDetails";
import { WalletContext } from "@/context/WalletContext";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import ClubALanuchBanner from "../WrapperComponent/ClubALanuchBanner";

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



    return (
        <div className="relative flex flex-col items-center justify-center w-full h-[40rem] lg:h-screen ">
            <div className="absolute -top-[90px] sm:top-[30px] md:-top-[20px]    flex items-center justify-center  lg:top-[10px]   h-full w-full z-0">
                <video
                    muted
                    autoPlay
                    className=" lg:h-full  lg:w-auto"
                >
                    <source src="/logo_down_up.mp4"  type="video/mp4" />
                </video>
            </div>

            <div className="z-10 px-10 lg:p-20 mb-96   mt-[120%] sm:mt-[90%] md:mt-[90%]  lg:mt-[50%] flex flex-col gap-5 justify-center items-center w-full">
                <div className="flex  items-center justify-center flex-col">
                    <div className="flex flex-col items-center justify-center h-auto w-auto ">
                        <p className="text-neutral-200 text-xs md:text-lg lg:text-xl  ">
                            A Space Where You are The First Creator
                        </p>
                        <div className="hidden lg:block">
                            <TypewriterEffectSmooth words={words} />
                        </div>
                        <div className="text-center lg:hidden text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 text-2xl font-bold md:text-3xl lg:text-5xl ">
                            Welcome To Believe Network Space Ecosystem
                        </div>
                    </div>
                </div>
                <p className="text-xs text-center md:text-lg lg:text-lg text-white">
                    It is Based On The BNB (Smart Chain) Smart Contract 100% Decentralized System.
                </p>
                
            </div>

            
        </div>
    );
};

export default HeroContent;