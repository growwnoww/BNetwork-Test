"use client";
import Image from "next/image";
import React, { useState } from "react";
import "../../../app/globals.css";
import Link from "next/link";
import { FaUnlockAlt, FaUserLock } from "react-icons/fa";
import { FcLock, FcUnlock } from "react-icons/fc";

interface PlanetUpPropsTypes {
  imgURL: string;
  packageName: string;
  packagePrice: number;
  treePath: string;
  chartPath: string;
}

const PlanetUpPackage = ({
  imgURL,
  packageName,
  packagePrice,
  treePath,
  chartPath,
}: PlanetUpPropsTypes) => {
  const [isApprove, setApprove] = useState<boolean>(false);

  const [planetBuy, setPlanetBuy] = useState<boolean>(false);

  return (
    <div className="relative z-0  flex flex-col bg-zinc-800 rounded-md  m-2 mx-5">
      <div className=" flex items-center justify-between w-full px-2 py-3 ">
        <div className="text-xl flex items-start justify-start">
          <p>
            {packageName} <span>{packagePrice}$</span>
          </p>
        </div>
      </div>

      <div className="z-10 absolute top-[39%] right-[30%] flex flex-col items-center text-xl font-semibold">
        {planetBuy ? (
          ""
        ) : (
          <span className="text-3xl">
            <FaUserLock />
          </span>
        )}

        {planetBuy ? (
          ""
        ) : (
          <div>
            {isApprove ? (
              <button className="bg-yellow-500 py-1 px-5  rounded-md hover:bg-yellow-600 duration-300">
                <span className="bg-yellow-500 py-1 px-5 flex  items-center gap-x-1  rounded-md hover:bg-yellow-600 duration-300">
                  Upgrade
                </span>
              </button>
            ) : (
              <button className="bg-yellow-500 py-1 px-5  rounded-md hover:bg-yellow-600 duration-300">
                Approve
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center bg-black  py-10 px-10 opacity-40 blur-[2px]">
        <Image
          src={imgURL}
          alt={imgURL}
          height={packageName == "Saturn" ? 150 : 150}
          width={packageName == "Saturn" ? 150: 150}
          loading="lazy"
          className={`${packageName == "Saturn" ? "" : "custom-spin"}`}
        />
      </div>

      <div className="flex items-center justify-center py-3">
        {planetBuy ? (
          <div className="flex flex-col items-center gap-y-1">
            <Link
              href={chartPath}
              className="bg-yellow-500 py-1 px-5 flex  items-center gap-x-1  rounded-md hover:bg-yellow-600 duration-300"
            >
              <span>View tree</span>
            </Link>
          </div>
        ) : (
          <div className="flex  items-center gap-y-1 gap-x-2"></div>
        )}
      </div>
    </div>
  );
};

export default PlanetUpPackage;
