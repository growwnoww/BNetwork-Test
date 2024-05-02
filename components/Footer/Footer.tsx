import Image from "next/image";
import React from "react";
import { BsTelegram, BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { SiBinance } from "react-icons/si";


const Footer = () => {
  return (
    <div className="flex flex-col bg-stone-900  lg:px-24 py-8 z-40">
      <div className="flex flex-col  lg:flex-row  lg:items-center justify-between mx-12">
        <div className="">
            <Image
            src="/BELIEVE-LOGO-07.png"
            alt="Believe logo"
            height={70}
            width={70}
            loading="lazy"
            />
        </div>
        <div className="flex ml-3  lg:ml-0 gap-x-12 lg:gap-x-6 text-2xl z-40">
          <a
            href="https://www.facebook.com/BelieveNetworkSpaceOfficial"
            target="_blank"
          >
            {" "}
            <FaFacebook className="text-blue-500 my-2 " />
          </a>
          <a href="https://twitter.com/BNetworkSpace" target="_blank">
            <BsTwitterX className=" my-2 " />
          </a>
          <a href="https://t.me/BNetworkSpace_Official" target="_blank">
            <BsTelegram className="text-blue-400 my-2 " />
          </a>
          <a
            href="https://whatsapp.com/channel/0029VaA5OKX6buMSmdXnJh3Q"
            target="_blank"
          >
            <ImWhatsapp className="text-green-500 my-2 " />
          </a>
          <a
            href="https://www.youtube.com/@BelieveNetworkSpaceOfficial/featured"
            target="_blank"
          >
            <FaYoutube className="text-red-500 my-2 " />
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />


       

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  xl:grid-cols-5 mx-12">
        <div className="flex flex-col gap-y-2 text-zinc-500">
          <div className="text-white">All Services</div>
          <div>NFT Marketplace</div>
          <div>BN Coin</div>          
        </div>
        <div className="flex flex-col gap-y-2 text-zinc-500">
          <div className="text-white">Account</div>
          <div>Dashboard</div>
          <div>BN System</div>

        </div>
        <div className="flex flex-col gap-y-2 text-zinc-500">
          <div className="text-white">Community</div>
          <div>News</div>
          <div>Reviews</div>


        </div>
        <div className="flex flex-col gap-y-2 text-zinc-500">
          <div className="text-white">Resources</div>
          <div>Smart Contracts</div>
          <div>Royalty</div>
         
        </div>
        <div className="flex flex-col gap-y-2 text-zinc-500">
          <div className="text-white">General</div>
          <div>About</div>
          <div>News</div>
          
        </div>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col lg:flex-row  items-center lg:items-center justify-between gap-y-4">
        <div className="flex  items-center gap-x-3">
            <SiBinance className="text-yellow-500 text-3xl"/>
            <p className="font-bold text-lg">Binance</p>
            <p className="text-sm text-gray-500 mt-1">Web3 Info Smart Contract</p>
        </div>
        <div>Terms & Services | Support</div>
        <div>@2024 All Rights Reserved</div>
      </div>
    </div>
  );
};

export default Footer;
