import React from "react";
import { FaCheckSquare } from "react-icons/fa";

type Props = {};

const BounceData = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center max-w-sm lg:max-w-md  space-x-3 lg:space-x-6 my-3  ">
          <div className="">
            <FaCheckSquare className="text-4xl text-green-500 " />
          </div>
          <div className="flex flex-col   ">
            <p className="text-xs lg:text-lg">Time for withdraw:</p>
            <p className="text-xs lg:text-lg"></p>
          </div>
          <div>
            <p className="text-xs lg:text-lg">Reward</p>
            <p className="text-xs  lg:text-lg">${1000}</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <button className="bg-green-500 px-3 py-1 font-semibold rounded-lg text-xs lg:text-md">
          Claimined
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-1 h-[1px] w-full" />
    </>
  );
};

export default BounceData;
