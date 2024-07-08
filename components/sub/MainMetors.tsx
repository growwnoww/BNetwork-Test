import React from "react";
import { Meteors } from "../ui/meteors";



interface MainMetorsProps{
    logo:React.ReactNode;
    title:String;
    description:String;
    widthP:String;
    textSize:String;
}

export function MainMetors({logo,title,description,widthP,textSize}:MainMetorsProps) {
  return (
    <div className="">
      <div className="w-[10rem] h-[6rem] lg:w-full lg:h-full  relative max-w-xs">
        <div className="absolute inset-1 h-full lg:w-[24rem] bg-gradient-to-r from-yellow-400 to-yellow-500 transform scale-[0.80] bg-yellow-500 rounded-full blur-3xl opacity-40" />
        <div className={` lg:w-[${widthP}rem] relative  shadow-xl backdrop-blur-md  border border-slate-600  lg:border-[15px] lg:border-zinc-800  px-5 py-8 h-full overflow-hidden rounded-2xl flex  lg:flex-col items-center justify-center lg:items-start lg:justify-end gap-y-3`}>
        <div className="flex  flex-col lg:flex-row  items-center justify-center gap-x-5">
        <div className="text-4xl">
          {logo}

          </div>
          <div className="font-bold  text-sm lg:text-2xl">{title}</div>
        </div>
          <div className={`hidden lg:block  lg:text-${textSize}  opacity-50 text-gray-300`}>{description}</div>
          <div>
          <button className="hidden lg:block border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Explore
           </button>
          </div>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
