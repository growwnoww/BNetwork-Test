'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import RenderItems from './RenderItem';
import RenderItem1 from './RenderItem1';

const initialDetails = [
  {
    title: "Idea Of BNS Eco-System",
    time: "(01.01.23 - Q1)",
  },
  {
    title: "BN Coin Airdrop",
    time: "(Q.3 – 2023) (29/08/23)",
  },
  {
    title: "Planets Upgrade Plan",
    time: "(Q3- 2023) (29/08/23)",
  },
  // {
  //   title: " BNS Energy (NFT Royalty) ",
  //   time: "(14/02/24) (Q1 -2024)",
  // },
  // {
  //   title: "👉 Universe ∞ CLUB- A Matrix",
  //   time: "(15/04/24)",
  // },
 
];

const futureDetails1 = [
  {
    title: " NFT Royalty",
    time: "(Q.2- 2024)",
  },
  {
    title: "BN MINING ⛏️",
    time: "(Q.2- 2024)",
  },
  {
    title: "BNS Forex Trading AI Robot (NFT Income and Coin Liquidity)",
    time: "(Q.2. 2024)",
  },
  // {
  //   title: "BNS Lottery (NFT Income and Coin Liquidity)",
  //   time: "(Q.2. 2024)",
  // },
  // {
  //   title: "👉 BNS ACADEMY",
  //   time: "(Q.3- 2024)",
  // },
];

const futureDetails2 = [
  {
    title: "BN Coin Pre-Sale",
    time: "(Q.3- 2024 )",
  },
  {
    title: " Eco System ON BN COIN",
    time: "(Q.3 – 2024 )",
  },

  {
    title: "BNS GAMING (NFT Income and Coin Liquidity)",
    time: "(Q.3. 2024)",
  },

  // {
  //   title: "👉 BN Coin Listing- DEX Swap",
  //   time: "(Q.3 – 2024)",
  // },
  // {
  //   title: "👉 BNS Lottery (NFT Income and Coin Liquidity)",
  //   time: "(Q.3. 2024)",
  // },
];

const futureDetails3 = [
  {
    title: "Royalty NFT Marketplace",
    time: "(Q3-2024)",
  },
  {
    title: "UNIVERSE CLUB - B Matrix",
    time: "(Q.3. 2024)",
  },
  {
    title: "UNIVERSE CLUB - C Matrix",
    time: "(Q.4 2024)",
  },

  // {
  //   title: "👉 BN Global ∞ Plan",
  //   time: "(Q.1- 2025)",
  // },
  // {
  //   title: "👉 BN Galaxy ∞ Plan",
  //   time: "(Q.3- 2026)",
  // },
];

const splitIntoChunks = (str:any, size:any) => {
  const words = str.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks;
};


const RoadmapItem = ({ title, date, visible }: any) => {

  const titleChunks = splitIntoChunks(title, 3);

  return (
    <div
      className={`relative flex flex-col  ${!visible && "invisible"} text-center`}
      style={{ transform: "translateY(-47px) translateX(-40px)" }} // Adjust this value as needed
    >
      <div className="rounded-lg text-center h-auto w-[100px] lg:w-[140px]">
        {titleChunks.map((chunk:any, index:any) => (
          <h6
            key={index}
            className="text-[7px] sm:text-[9px] md:text-[10px] lg:text-[12px] font-medium text-white"
          >
            {chunk}
          </h6>
        ))}
        {date && (
          <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] text-white">
            {date}
          </span>
        )}
      </div>
    </div>
  );
};

const RoadmapBN = () => {
  const [itemsPerRow, setItemsPerRow] = useState(5);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerRow(3); // Mobile
      } else if (width < 1024) {
        setItemsPerRow(4); // Tablet
      } else {
        setItemsPerRow(5); // Desktop
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-[80%] lg:w-auto border rounded-2xl text-white">
      <style>{`.invisible { visibility: hidden; }`}</style>

      <h2 className="font-bold text-5xl mb-16 text-center">Roadmap</h2>

      <div className="translate-x-[10%]">
        {/* Render initial details */}
        {RenderItems(initialDetails, RoadmapItem, itemsPerRow)}

        {/* Render future details */}
        {RenderItem1(futureDetails1, RoadmapItem, itemsPerRow)}
        {RenderItem1(futureDetails2, RoadmapItem, itemsPerRow)}
        {RenderItem1(futureDetails3, RoadmapItem, itemsPerRow)}
      </div>
    </div>
  );
};

export default RoadmapBN;
