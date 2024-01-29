"use client";
import CurrentBalanceComp from "@/components/clientcomponents/CurrentBalanceComp";
import CurrentRouteHeading from "@/components/clientcomponents/CurrentRouteHeading";
import LanguageSelector from "@/components/clientcomponents/LanguageSelector";
import React, { useState } from "react";
import Image from "next/image";
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import HamaburgerMenu from "./HamaburgerMenu";
import { useRecoilState } from "recoil";
import { hamaburgerAtom } from "@/store/atom";

const DashboardNavbar = () => {


  const [isOpen,setOpen] = useRecoilState(hamaburgerAtom);

 
  const toogleBtn = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center justify-between   h-16 border-b-[.5px] border-b-slate-800">
      <div className="block lg:hidden">
        <Image src="/BNSymbol.png" alt="BNSymbol" height={70} width={70} />
      </div>

      <div className="pr-6 md:pl-4">
        <CurrentRouteHeading />
      </div>

      <div className="hidden lg:flex gap-x-5">
        <CurrentBalanceComp />
        <LanguageSelector />
      </div>

      {/* hamaburger menu */}

      <div
        className="lg:hidden border border-zinc-600 p-1 rounded-md bg-zinc-800 mr-4"
        onClick={toogleBtn}
      >
        {isOpen ? (
          <IoCloseSharp className="text-xl text-stone-400" />
        ) : (
          <IoMenu className="text-xl text-stone-400" />
        )}
      </div>

      {isOpen&&  <HamaburgerMenu/>}
    </div>
  );
};

export default DashboardNavbar;
