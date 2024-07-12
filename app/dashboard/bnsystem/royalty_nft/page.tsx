"use client";
import { CardWithForm } from "@/components/dashboardComponents/NFT/CreateCardNFT";
import NFT_Container from "@/components/dashboardComponents/NFT/NFT_Container";
import React from "react";

const RoyaltyNFT = () => {
  return (
    <div className="mb-10">
      <div className="h-20 w-full bg-zinc-900 rounded-2xl my-3 mx-3">

      </div>

      <div className="grid grid-rows-2">
        <div className="border-b-2 border-b-zinc-800 flex flex-col items-center justify-center">
          {/* <p className="text-4xl border-b-2 border-yellow-400 -translate-y-4">Create NFTs</p>
          <div className="bg-zinc-900 h-80 w-[50rem] rounded-2xl">

          </div> */}

          <CardWithForm/>
        </div>
        <div className="mx-4">
          <div className="mb-4 mt-2">
            <p className="text-3xl font-semibold bg-zinc-900 w-full p-2 rounded-xl">Your NFTs</p>
          </div>
          <NFT_Container
            title="Just NFT"
            nft_num="#1212"
            nft="/just_spaceship.mp4"
          />
        </div>
      </div>
    </div>
  );
};

export default RoyaltyNFT;
