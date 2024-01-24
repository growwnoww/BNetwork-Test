"use client";
import CurrentBalanceComp from "@/components/clientcomponents/CurrentBalanceComp";
import CurrentRouteHeading from "@/components/clientcomponents/CurrentRouteHeading";
import LanguageSelector from "@/components/clientcomponents/LanguageSelector";
import React, { useState } from "react";
import Image from "next/image";
import { IoCloseSharp, IoGitMerge, IoMenu } from "react-icons/io5";
import { MenuList } from "@/utils/MenuList";
import { GrLanguage } from "react-icons/gr";
import Link from "next/link";
import { NestedMenuList } from "@/utils/NestedMenuList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageList } from "@/utils/languagelist";
import HamaburgerMenu from "./HamaburgerMenu";

const DashboardNavbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

 
  const toogleBtn = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center justify-between  px-5 h-16 border-b-[.5px] border-b-slate-800">
      <div className="block md:hidden">
        <Image src="/BNSymbol.png" alt="BNSymbol" height={70} width={70} />
      </div>

      <div className="pr-6 md:pl-4">
        <CurrentRouteHeading />
      </div>

      <div className="hidden md:flex gap-x-5">
        <CurrentBalanceComp />
        <LanguageSelector />
      </div>

      {/* hamaburger menu */}

      <div
        className="md:hidden border border-zinc-600 p-1 rounded-md bg-zinc-800"
        onClick={toogleBtn}
      >
        {isOpen ? (
          <IoCloseSharp />
        ) : (
          <IoMenu className="text-xl text-stone-400" />
        )}
      </div>

      {isOpen&&  <HamaburgerMenu isOpen={isOpen}/>}
    </div>
  );
};

export default DashboardNavbar;
