import React from "react";
import { MainMetors } from "./MainMetors";
import { FaEarthAfrica } from "react-icons/fa6";
import { RiNftFill } from "react-icons/ri";
import { TbCards, TbUniverse } from "react-icons/tb";
import { GiCoins } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";




const MainMetorsData = [
    {
        id:1,
        logo:<IoMdPlanet/>,
        title:"CosMos Network",
        description:"A program that provides various levels of access to exciting opportunities in all areas of the metaverse.",
    },
    {
        id:2,
        logo:<TbCards/>,
        title:"NFT Royalty",
        description:"By participating in the program, you get profit and maintain the balance of our BNS Eco system.",
    },
    {
        id:3,
        logo:<TbUniverse/>,
        title:"Universe Clubs",
        description:"The Universe is the heart of our BNS Eco-System, its core layer, a simulation of real life.",
    },
    {
        id:4,
        logo:<GiCoins/>,
        title:"BN Coin",
        description:"By participating In the BNetwork Space Eco-System, You will get all Profit in BN Coin For Increase Utilities.",
    },
]

export function GridBackground() {
  return (
    <div className=" lg:h-[50rem] w-full bg-black   bg-grid-white/[0.2]  relative flex items-center justify-center mt-8">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        
      </p>
       <div className="w-[100vw] flex items-center   ">
        <ul className="grid grid-cols-2   w-[100vw]    gap-x-6 gap-y-5  ">
        {
            MainMetorsData.map((item)=>(
                <li key={item.id} className={` w-full p-4 flex items-center justify-center  ${item.id === 1 || item.id === 3 ? 'flex items-center justify-center ' : 'lg:block'}`}>
                                <MainMetors logo={item.logo} title={item.title} description={item.description} widthP={"35"} textSize={"md"}/>
                            </li>
            ))
        }
        </ul> 
        
        </div>
    </div>
  );
}
