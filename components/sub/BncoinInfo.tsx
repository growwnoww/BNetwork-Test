import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import PieChartDemo from "./PieChart";
import { SiBinance } from "react-icons/si";
import Image from "next/image";
import { GlobeDemo } from "./Globe";



export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-9xl mx-auto md:auto-rows-[26rem]  ">
      {items.map((item, i) => (

        
        <BentoGridItem
          key={i}
          // title={item.title}
          // description={item.description}
          header={item.header}
          className={item.className}
          // icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   bg-dot-white/[0.2]  [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border  border-white/[0.2]  bg-black"></div>
);

const BinanceBg = () =>(
  <>
  <div className="absolute flex flex-1  w-[15rem] h-[20rem] rounded-xl bg-gradient-to-br   from-yellow-600 to-yellow-500 blur-3xl opacity-80">

</div>
<div className="border w-full h-full min-h-[6rem] flex flex-col items-center justify-center bg-transparent border-opacity-50 rounded-xl backdrop-blur-sm border-neutral-600">
<SiBinance className="text-yellow-500 text-8xl"/>
<p className="text-4xl font-semibold">Binance</p>
<p className="text-xl opacity-50">Blockchain</p>

</div>
  </>

)

const BNCoinBg = () =>(
  <>
  <div className="absolute flex flex-1  w-[15rem] h-[20rem] rounded-xl bg-gradient-to-br   from-orange-400 to-orange-500 blur-3xl opacity-80">

</div>
<div className="border w-full h-full min-h-[6rem] flex flex-col items-center justify-center bg-transparent border-opacity-50 rounded-xl backdrop-blur-sm border-neutral-600">
  <Image
  src='/b-coin.png'
  alt="BN Coin"
  height={100}
  width={100}
  />
<p className="text-4xl font-semibold">BN Coin</p>
<p className="text-xl opacity-50">(BNS)</p>

</div>
  </>

)


const items = [
  {
    title: "The Dawn of Innovation",
    // description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <PieChartDemo/>,
    className: "w-[38rem] h-[26rem] md:col-span-2 ",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    // title: "The Digital Revolution",
    // description: "Dive into the transformative power of technology.",
    header: <BinanceBg/>,
    className: " h-[26rem] md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    // description: "Discover the beauty of thoughtful and functional design.",
    header: <BNCoinBg />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    // description:
    //   "Understand the impact of effective communication in our lives.",
    header: <GlobeDemo/>,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];


