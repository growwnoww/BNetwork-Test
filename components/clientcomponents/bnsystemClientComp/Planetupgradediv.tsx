import LevelIcon from "@/components/dashboardComponents/LevelIcon";
import React from "react";
import BtnWrapper from "@/components/WrapperComponent/BtnWrapper";

const Planetupgradediv = () => {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div className="bg-[#1f1f1f] flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-between py-8 m-3 rounded-md">
      <div className="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl  px-3"> Planet Upgrade System</div>
      <div className="flex flex-col lg:flex-row gap-y-6  items-center justify-center gap-x-9 mx-10">
        <div className="h-fit grid grid-cols-5 w-fit  gap-x-2 ">
        {levels.map((index) => (
            <LevelIcon key={index} level={index } id={`planetUpgrade-level-${index + 1}`} context="planetUpgrade"/>
          ))}
        </div>
        <BtnWrapper
          text="show"
          height="py-2"
          width="px-10"
          path="/dashboard/bnsystem/planetupgrade"
        />
      </div>
    </div>
  );
};

export default Planetupgradediv;
