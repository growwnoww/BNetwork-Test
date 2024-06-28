// const detailsData = [

//   {
//     title: "💡 Idea Of BNS Eco-System",
//     time: "(01.01.23 - Q1)",
//   },
//   {
//     title: "👉 BN Coin Airdrop",
//     time: "(Q.3 – 2023) (29/08/23)",
//   },
//   {
//     title: "👉 Planets Upgrade Plan",
//     time: "(Q3- 2023) (29/08/23)",
//   },
//   {
//     title: "👉 BNS Energy (NFT Royalty) Token Distribution",
//     time: "(14/02/24) (Q1 -2024)",
//   },
//   {
//     title: "👉 Universe ∞ CLUB- A Matrix",
//     time: "(15/04/24)",
//   },
 
//   {
//     title: "👉 NFT Royalty",
//     time: "(Q.2- 2024)",
//   },
//   {
//     title: "👉 BN MINING ⛏️",
//     time: "(Q.2- 2024)",
//   },
//   {
//     title: "👉 BNS Forex Trading AI Robot (NFT Income and Coin Liquidity)",
//     time: "(Q.2. 2024)",
//   },
//   {
//     title: "👉 BNS Lottery (NFT Income and Coin Liquidity)",
//     time: "(Q.2. 2024)",
//   },
//   {
//     title: "👉 BNS ACADEMY",
//     time: "(Q.3- 2024)",
//   },
//   {
//     title: "👉 BN Coin Pre-Sale",
//     time: "(Q.3- 2024 )",
//   },
//   {
//     title: "👉 Eco System ON BN COIN",
//     time: "(Q.3 – 2024 )",
//   },
//   {
//     title: "👉 BNS GAMING (NFT Income and Coin Liquidity)",
//     time: "(Q.3. 2024)",
//   },
//   {
//     title: "👉 BN Coin Listing- DEX Swap",
//     time: "(Q.3 – 2024)",
//   },
//   {
//     title: "👉 BN Staking And Reward Program",
//     time: "(Q3- 2024)",
//   },
//   {
//     title: "👉 BNS Lottery (NFT Income and Coin Liquidity)",
//     time: "(Q.3. 2024)",
//   },
//   {
//     title: "👉 Royalty NFT Marketplace",
//     time: "(Q3-2024)",
//   },
//   {
//     title: "👉 UNIVERSE CLUB - B Matrix",
//     time: "(Q.3. 2024)",
//   },
//   {
//     title: "👉 UNIVERSE CLUB - C Matrix",
//     time: "(Q.4 2024)",
//   },
//   {
//     title: "👉 BN Global ∞ Plan",
//     time: "(Q.1- 2025)",
//   },
//   {
//     title: "👉 BN Galaxy ∞ Plan",
//     time: "(Q.3- 2026)",
//   },
//   {
//     title: "👉 BN Metaverse",
//     time: "(Q.4- 2026)",
//   },
//   {
//     title: "👉 BN Blockchain And Many More Coming Soon",
//     time: "(Q1- 2027)",
//   },
// ];
//@ts-nocheck
"use client";
import React, { useRef } from "react";
import LiIcon from "@/components/LiIcon";
import { FaRegCheckCircle } from "react-icons/fa";


const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  work,
  completed, // Add this prop
  onMouseEnter,
  onMouseLeave,
}: any) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className={`my-8 first:mt-0 last:mb-0 w-[60%] z-50 mx-auto flex flex-col items-center justify-between ${completed ? 'text-yellow-500' : 'text-light'} md:w-[80%}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <LiIcon reference={ref} />
      <div className="flex items-center">
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg z-50">
          {position}&nbsp;
        </h3>
        {completed && (
          <FaRegCheckCircle className="h-6 w-6 text-yellow-500 ml-2" /> // Completed icon
        )}
      </div>
      <span className="capitalize font-medium text-light xs:text-sm">
        {time} | {address}
      </span>
      <p className="font-medium w-full md:text-sm">{work}</p>
    </li>
  );
};

export default Details;

