import React from "react";
import { Meteors } from "../ui/meteors";



interface MainMetorsProps{
    logo:React.ReactNode;
    title:String;
    description:String;
}

export function MainMetors({logo,title,description}:MainMetorsProps) {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-1 h-full lg:w-[35rem] bg-gradient-to-r from-yellow-400 to-yellow-500 transform scale-[0.80] bg-yellow-500 rounded-full blur-3xl opacity-40" />
        <div className=" lg:w-[35rem] relative shadow-xl backdrop-blur-md  border-[15px] border-zinc-800  px-5 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start gap-y-3">
        <div className="flex items-center gap-x-5">
        <div className="text-4xl">
          {logo}

          </div>
          <div className="font-bold text-2xl">{title}</div>
        </div>
          <div className="text-md opacity-50 text-gray-300">{description}</div>
          <div>
          <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
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
