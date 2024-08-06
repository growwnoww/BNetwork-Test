"use client";
import React from "react";
import ShootingStars from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/start-background";
export function ShootingStarsAndStarsBackgroundDemo({
  currentNFT,
}: {
  currentNFT: string;
}) {
  return (
    <>
      <div className="h-[30rem] rounded-md bg-[#160f17] flex flex-col items-center justify-center relative w-full">

          <video autoPlay loop muted height={320} width={320}>
            <source src={`/${currentNFT}.mp4`} type="video/mp4" />
          </video>
       

        <ShootingStars />
        <StarsBackground />
      </div>
    </>
  );
}
