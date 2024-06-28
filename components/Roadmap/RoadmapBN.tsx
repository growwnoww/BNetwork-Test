"use client";
import React from "react";
import horseImage from "../../public/Green.png";
import grayImage from "../../public/Silver.png";
import bgImage from "../../public/image.png";
import orangeImage from "../../public/Orange.png"
import "./style.css";
const styles = `
.invisible {
  visibility: hidden;
}
`;

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
  {
    title: " BNS Energy (NFT Royalty) ",
    time: "(14/02/24) (Q1 -2024)",
  },
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
  {
    title: "BNS Lottery (NFT Income and Coin Liquidity)",
    time: "(Q.2. 2024)",
  },
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

  {
    title: "👉 BN Coin Listing- DEX Swap",
    time: "(Q.3 – 2024)",
  },
  // {
  //   title: "👉 BNS Lottery (NFT Income and Coin Liquidity)",
  //   time: "(Q.3. 2024)",
  // },
];

const futureDetails3 = [
  {
    title: "👉 Royalty NFT Marketplace",
    time: "(Q3-2024)",
  },
  {
    title: "👉 UNIVERSE CLUB - B Matrix",
    time: "(Q.3. 2024)",
  },
  {
    title: "👉 UNIVERSE CLUB - C Matrix",
    time: "(Q.4 2024)",
  },

  {
    title: "👉 BN Global ∞ Plan",
    time: "(Q.1- 2025)",
  },
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
      style={{ transform: "translateY(-47px) translateX(-30px)" }} // Adjust this value as needed
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
  return (
    <div
      className=" w-[88%] lg:w-auto  border  rounded-2xl  "
      // -translate-y-[70%] -translate-x-[28%]
      // style={{
      //   backgroundImage: `url(${bgImage.src})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <style>{`
        .invisible {
          visibility: hidden;
        }
      `}</style>

      <h2 className="font-bold text-5xl mb-16 text-center text-white">
        Raodmap
      </h2>


    <div className="translate-x-[10%]">
    <div className="relative   lg:w-auto mx-auto flex justify-center items-center z-1 ">
      <div className="relative flex z-3 ">
        {/* SVG Line */}
        <svg
          className="absolute top-0 left-0 w-[75%] lg:w-full h-full"
          viewBox="0 0 1500 100"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="orange"
            strokeWidth="2"
            points="0,50 1500,50"
          />
          <polyline
            fill="none"
            stroke="gray"
            strokeWidth="2"
            points="0,100000 1500,50"
           />
          {initialDetails.map((_, index) => (
            <foreignObject
              key={index}
              x={index * 440 + 68}
              y="24"
              width="54"
              height="54"
            >
              <div className={`border-2 ${index === 4 ? 'blink' : ''}`} style={{ borderRadius: '50%', width: '54px', height: '54px' }}>
                <img
                  src={index === 4 ? orangeImage.src : horseImage.src}
                  alt="Roadmap Item"
                  style={{
                    borderRadius: "50%",
                    width: "54px",
                    height: "54px",
                  }}
                />
              </div>
             </foreignObject>
          ))}
        </svg>

        {/* Roadmap Items */}
        {initialDetails.map((detail, index) => (
          <div
            key={index}
            style={{ width: 140 }}
            className="flex flex-col items-center justify-center z-50"
          >
            <RoadmapItem
              title={detail.title}
              date={detail.time}
              visible={true}
            />
          </div>
        ))}
      </div>
      </div>

      {/* dummy line div  */}

      <div className="relative   mx-auto flex justify-center items-center ">
        <div className="relative flex  lg:space-x-8 lg:px-8 no-scrollbar">
          {/* SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[75%] lg:w-full h-full"
            viewBox="0 0 1500 100"
            preserveAspectRatio="none"
          >
            {/* <polyline
              fill="none"
              stroke="orange"
              strokeWidth="2"
              points="0,50 1500,50"
            /> */}

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,100000 1500,-10,52"
            />
          </svg>
          {/* Roadmap Items */}
          {initialDetails.map((detail: any, index) => (
            <div
              key={index}
              style={{ width: 140 }}
              className="relative z-30 flex flex-col  "
            >
              <RoadmapItem
                title={detail.title}
                date={detail.time}
                visible={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Future Timeline 1 */}
      <div className="relative  lg:w-auto  mx-auto flex justify-center items-center z-1">
        <div className="relative flex    z-3">
          {/* SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[75%] lg:w-full h-full"
            viewBox="0 0 1500 100"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50000 1500,500000 1,50"
            />

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,-20500 900,-20500 1500,50"
            />
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50 1500,50"
            />
            {initialDetails.map((_, index) => (
              <foreignObject
                key={index}
                x={index * 440 + 68}
                y="24"
                width="54"
                height="54"
              >
                <div className="blink-">
                  <img
                    src={grayImage.src}
                    alt="Roadmap Item"
                    style={{
                      borderRadius: "50%",
                      width: "54px",
                      height: "54px",
                    }}
                  />
                </div>
              </foreignObject>
            ))}
          </svg>
          {/* Roadmap Items */}
          {futureDetails1.map((detail, index) => (
            <div
              key={index}
              style={{ width: 140 }}
              className="relative z-50 flex flex-col  "
            >
              <RoadmapItem
                title={detail.title}
                date={detail.time}
                visible={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* dummy line div2 */}

      <div className="relative w-full mx-auto flex justify-center items-center ">
        <div className="relative flex  lg:space-x-8 lg:px-8 lg:no-scrollbar">
          {/* SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[80%] lg:w-full h-full"
            viewBox="0 0 1500 100"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50000 1500,500000 1,50"
            />

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,-50 1,0 00,50"
            />
          </svg>
          {/* Roadmap Items */}
          {initialDetails.map((detail, index) => (
            <div
              key={index}
              style={{ width: 140 }}
              className="relative z-10 flex flex-col "
            >
              <RoadmapItem
                title={detail.title}
                date={detail.time}
                visible={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative lg:w-full mx-auto flex justify-center items-center ">
        <div className="relative flex  lg:space-x-8 lg:px-8 lg:no-scrollbar">
          {/* SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[75%] lg:w-full h-full"
            viewBox="0 0 1500 100"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,-90 1,0 00,50"
            />
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50 1500,50"
            />

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50000 1500,50"
            />

            {initialDetails.map((_, index) => (
              <foreignObject
                key={index}
                x={index * 440 + 68}
                y="24"
                width="54"
                height="54"
              >
                <div className="">
                  <img
                    src={grayImage.src}
                    alt="Roadmap Item"
                    style={{
                      borderRadius: "50%",
                      width: "54px",
                      height: "54px",
                    }}
                  />
                </div>
              </foreignObject>
            ))}
          </svg>
          {/* Roadmap Items */}
          {futureDetails2.map((detail, index) => (
            <div
              key={index}
              style={{ width: 140 }}
              className="relative z-10 flex flex-col "
            >
              <RoadmapItem
                title={detail.title}
                date={detail.time}
                visible={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* dummy line div3  */}

      <div className="relative w-full mx-auto flex justify-center items-center m">
        <div className="relative flex  lg:space-x-8 lg:px-8 lg:no-scrollbar">
          {/* SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[75%] lg:w-full h-full"
            viewBox="0 0 1500 100"
            preserveAspectRatio="none"
          >
            {/* <polyline
              fill="none"
              stroke="orange"
              strokeWidth="2"
              points="0,50 1500,50"
            /> */}

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,100000 1500,-4,52"
            />
          </svg>
          {/* Roadmap Items */}
          {initialDetails.map((detail: any, index) => (
            <div
              key={index}
              style={{ width: 140 }}
              className="relative z-10 flex flex-col  "
            >
              <RoadmapItem
                title={detail.title}
                date={detail.time}
                visible={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full mx-auto flex justify-center items-center ">
        <div className="relative flex  lg:space-x-8 lg:px-8 ">
          {/* SVG Line */}
          <svg
            className="absolute top-0 left-0 w-[80%] lg:w-full h-full"
            viewBox="0 0 1500 100"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50000 1500,500000 1,50"
            />

            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,-20500 1000,-20500 1500,50"
            />
            <polyline
              fill="none"
              stroke="gray"
              strokeWidth="2"
              points="0,50 1500,50"
            />

            {initialDetails.map((_, index) => (
              <foreignObject
                key={index}
                x={index * 310 + 68}
                y="24"
                width="54"
                height="54"
              >
                <div className="blink-">
                  <img
                    src={grayImage.src}
                    alt="Roadmap Item"
                    style={{
                      borderRadius: "50%",
                      width: "54px",
                      height: "54px",
                    }}
                  />
                </div>
              </foreignObject>
            ))}
          </svg>
          {/* Roadmap Items */}
          {futureDetails3.map((detail, index) => (
            <div
              key={index}
              style={{ width: 140 }}
              className="relative z-10 flex flex-col "
            >
              <RoadmapItem
                title={detail.title}
                date={detail.time}
                visible={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RoadmapBN;
