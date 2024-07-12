import React from "react";
import NFTCarousel from "./NFTCarousel";
import { Vortex } from "../ui/vortex";


const images = [
  "/just_spaceship.mp4",
  "/Earth_NFT.mp4",
  "/Mars_NFT.mp4",
  "/Venus_NFT.mp4",
  "/Saturn_NFT.mp4",
  "/Neptune_NFT.mp4"
];

function NFTSliderMain() {



  return (
    <div className="mt-16 mb-28">
      {/* <div className="text-center mb-16">
        <p className="text-7xl font-semibold">Royalty NFT</p>
        <p className="py-5">A program that provides earnings based on your engagement within the ecosystem.</p>
      </div> */}

  <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[25rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-8xl font-bold text-center">
          Royalty NFT
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        A program that provides earnings based on your engagement within the ecosystem.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Buy Now
          </button>
        </div>
      </Vortex>
    </div>
      <NFTCarousel images={images} />
    </div>

  
  );
}

export default NFTSliderMain;
