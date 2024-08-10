import React from "react";
import { useId } from "react";
import { BsBagFill } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { HiRectangleStack } from "react-icons/hi2";
import { SiWalletconnect } from "react-icons/si";
import { TbCardsFilled } from "react-icons/tb";

export function FeaturesSectionDemo() {
  return (
    <div className="pb-20 lg:py-40">
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3  gap-10 md:gap-x-7 gap-y-6 max-w-7xl mx-auto">
        {grid.map((feature,index) => (
          <div
            key={feature.title}
            className={`relative bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 rounded-3xl overflow-hidden flex flex-col items-center justify-center border border-neutral-700  ${
                index === 1 ? "row-span-2 " : ""
              } grid-area-${index + 1}`}
          >
            <Grid size={20} />
            <p className={` font-bold  text-yellow-500 relative z-20 ${index === 1 ? "text-9xl":"text-7xl"}`}>
              {feature.icon}
            </p>
            <p className={` text-neutral-300 mt-4 text-2xl  relative z-20 text-center font-semibold`}>
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  {
    title: "Connecting through any Web3 wallet",
    description:
      "Our applications are HIPAA and SOC2 compliant, your data is safe with us, always.",
    icon:<SiWalletconnect />

  },
  {
    title: "Creating your own NFTs and collections directly on the platform",

    icon:<HiRectangleStack />

  },
  {
    title: "Sell NFTs via auction or at a fixed price.",
    
    icon:<TbCardsFilled />

  },

  {
    title: "Earn commissions from each sale of your artwork.",

    icon:<FaSackDollar />

  },
  {
    title: "Create NFT stores.",
  
    icon:<BsBagFill />

  },


];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-yellow-400/30   to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay fill-amber-500/10 stroke-yellow-400/10  "
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
