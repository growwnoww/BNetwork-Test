"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import useUserDetails from "@/Hooks/useUserDetails";
import { WalletContext } from "@/context/WalletContext";
import { Button } from "../ui/button";

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
    <div className="relative flex flex-col items-center justify-center w-full h-screen">
      <div className="absolute top-[100px] left-0 h-full w-full z-0">
        <video
          muted
          autoPlay
          loop
          className="h-full w-full object-cover" // Ensure video covers the whole area without being cut
        >
          <source src="/mars_back.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="z-10 px-10 lg:p-20 mb-16 lg:mb-60 flex flex-col gap-5 justify-center items-center w-full">
        {" "}
        {/* Adjust the max-width to control the text block width */}
        <div className="flex items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center h-auto w-auto ">
            <p className="text-neutral-600 text-sm md:text-lg lg:text-xl  ">
              A Space Where You are The First Creator
            </p>
            <div className="hidden lg:block">
              <TypewriterEffectSmooth words={words} />
            </div>
            <div className="lg:hidden text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 text-3xl font-bold md:text-3xl lg:text-5xl ">
              Welcome to Believe Network Ecosystem Space
            </div>
          </div>
        </div>
        <p className="text-xs md:text-lg lg:text-lg text-white">
          It is Based On The BNB (Smart Chain) Smart Contract 100% Decentralized
          System.
        </p>
        
      </div>
      <div className="z-20 lg:hidden ">
          {isUserRegister && walletContext?.userAddress ? (
            <Link href="/dashboard">
              {" "}
              <Button variant={"secondary"}>Dashboard</Button>
            </Link>
          ) : (
            <div className="z-10">
            <Link href="/registration">
            <Button>
               Registration
             </Button>
            </Link>
            </div>
          )}
        </div>
     
    </div>
  );
};

export default HeroContent;
