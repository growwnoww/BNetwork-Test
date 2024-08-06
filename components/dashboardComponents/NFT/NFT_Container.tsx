import Link from "next/link";
import React from "react";

const NFT_Container = ({ title, nft_num, nft }: any) => {
  return (
    <div className="w-[18rem] h-[23rem] rounded-xl bg-zinc-900 hover:border-2  hover:border-yellow-500 ">
      {title === "Just NFT" ? (
        <>
          <div className="flex gap-x-3 bg-stone-800 rounded-tr-xl py-5 rounded-tl-xl">
            <div className="ml-2">{title}</div>
            <div>{`#${nft_num}`}</div>
          </div>
          <div className="flex items-center justify-center translate-y-5">
            <video autoPlay loop muted height={250} width={250}>
              <source src={nft} type="video/mp4" className="rounded-xl" />
            </video>
          </div>
        </>
      ) : (
        <Link href={`/dashboard/bnsystem/royalty_nft/${title}${nft_num}`}>
          <div className="flex gap-x-3 bg-stone-800 rounded-tr-xl py-5 rounded-tl-xl">
            <div className="ml-2">{title}</div>
            <div>{`#${nft_num}`}</div>
          </div>
          <div className="flex items-center justify-center translate-y-5">
            <video autoPlay loop muted height={250} width={250}>
              <source src={nft} type="video/mp4" className="rounded-xl" />
            </video>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NFT_Container;
