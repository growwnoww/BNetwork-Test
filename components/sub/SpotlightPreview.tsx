import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/Spotlight";
import Image from "next/image";
import { BentoGridSecondDemo } from "./BncoinInfo";

export function SpotlightPreview() {
  return (
    <div className="h-auto w-full rounded-md flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-[30%] md:-top-20"
        fill="#FFD700"
      />
      <div className=" p-4 max-w-7xl flex flex-col items-center justify-center   mx-auto relative z-10  w-full pt-20 md:pt-0  -translate-y-36">
        <video muted loop autoPlay className="  translate-y-16  " height={400} width={400}  >
          <source src="/BackRemvBNCoin.webm" type="video/webm"  />
        </video>
       <div className="absolute   bottom-[5%] w-full">
       <h1 className=" text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-5">
          BN Coin
        </h1>
        <p className="absolute top-[82%]  text-center font-normal text-sm lg:text-xl text-neutral-300 px-3    mx-5">
        Serving as the core digital asset, the native token powers the economy of the Believe Network Space ecosystem, enabling seamless transactions and commerce within its Gaming, Forex Trading AI Robot, Metaverse and partner integrations programs.
        </p>
       </div>
      </div>
      
      <div className="">

      {/* <BentoGridSecondDemo/> */}
      </div>

    </div>
  );
}
