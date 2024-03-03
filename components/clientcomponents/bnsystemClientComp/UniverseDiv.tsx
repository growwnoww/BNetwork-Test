import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import React from "react";
import BtnWrapper from "@/components/WrapperComponent/BtnWrapper";
import { IoIosUnlock } from "react-icons/io";

const UniverseDiv = () => {
  const levels1 = Array.from({ length: 10 }, (_, i) => i + 1);
  const levels2 = Array.from({ length: 10 }, (_, i) => i + 1);
  const levels3 = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className="bg-[#1f1f1f] flex flex-col lg:flex-row items-center justify-between py-8 m-3 rounded-md">
      <div className="text-2xl lg:text-3xl  px-3"> Universe Matrix System</div>

      <div>
        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-center gap-x-9 mx-10">
          <div className="flex flex-col">
            <div className="text-center py-3">Club A Matrix</div>
            <div className="h-fit grid grid-cols-5 w-fit gap-x-2 ">
            {levels1.map((index) => (
            <LevelIcon key={index} level={index } id={`universeA-level-${index + 1}`} context="universeA"/>
          ))}
            </div>
          </div>
          <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              
            />
            <IoIosUnlock className="absolute right-[10%]" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-center gap-x-9 mx-10">
          <div className="flex flex-col">
            <div className="text-center py-3">Club B Matrix</div>
            <div className="h-fit grid grid-cols-5 w-fit gap-x-2 ">
            {levels2.map((index) => (
            <LevelIcon key={index} level={index } id={`universeB-level-${index + 1}`} context="universeB"/>
          ))}
            </div>
          </div>
          <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              
            />
            <IoIosUnlock className="absolute right-[10%]" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-center gap-x-9 mx-10">
          <div className="flex flex-col">
            <div className="text-center py-3">Club C Matrix</div>
            <div className="h-fit grid grid-cols-5 w-fit gap-x-2 ">
            {levels3.map((index) => (
            <LevelIcon key={index} level={index } id={`universeC-level-${index + 1}`} context="universeC"/>
          ))}
            </div>
          </div>
          <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              
            />
            <IoIosUnlock className="absolute right-[10%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseDiv;
