"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import "../../../app/globals.css";
import Link from "next/link";
import { bNetwork, signer } from "@/contract/Web3_Instance";
import { FaUnlockAlt, FaUserLock } from "react-icons/fa";
import { FcLock, FcUnlock } from "react-icons/fc";
import { ethers } from "ethers";
import USBTToken from "../../../contract/USDTABI.json";
import { WalletContext } from "@/context/WalletContext";
import { M_PLUS_1 } from "next/font/google";

interface PlanetUpPropsTypes {
  planetId: number;
  imgURL: string;
  packageName: string;
  packagePrice: number;
  treePath: string;
  chartPath: string;
}

const PlanetUpPackage = ({
  planetId,
  imgURL,
  packageName,
  packagePrice,
  treePath,
  chartPath,
}: PlanetUpPropsTypes) => {
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const [isApprove, setApprove] = useState<boolean>(false);
  const [planetBuy, setPlanetBuy] = useState<boolean>(false);
  const [tokenBuypop, setTokenpop] = useState<boolean>(false);

  const getPlanetName = (planetId: number): string | undefined => {
    const planetNames: { [id: number]: string } = {
      1: "Earth 5$",
      2: "Moon 10$",
      3: "Mars 25$",
      4: "Mercury 50$",
      5: "Venus 100$",
      6: "Jupiter 250$",
      7: "Saturn 500$",
      8: "Uranus 1000$",
      9: "Neptune 2500$",
      10: "Pluto 5000$",
    };

    return planetNames[planetId];
  };

  const postPlanetBuyInfo = async (_planetId: number) => {
    try {
      const planetNameStr = getPlanetName(_planetId);
      const planetPack = planetNameStr?.split(" ")[1];
      console.log("Planet package ", planetPack);
      const payload = {
        reg_user_address: userAddress,
        planetId: _planetId,
        planetName: planetNameStr,
        planetPackage: planetPack,
      };

      console.log("payload",payload)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/planetBuy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("Something went wrong in buyPlanet", error);
    }
  };

  const approveUSDT = async () => {
    try {
      const gasPrice = await signer.getGasPrice();
      const myContract = bNetwork();
      const getFeeTokenAddress = await myContract!.getFeeToken();
      console.log("USDT TOken address", getFeeTokenAddress);
      const secondInstance = new ethers.Contract(
        getFeeTokenAddress,
        USBTToken,
        signer
      );
      const tokenAmt = 5;
      const approve = await secondInstance.approve(
        myContract!.address,
        tokenAmt
      );
      await approve.wait();
      console.log(approve);
      setApprove(true);
    } catch (error) {
      console.log(error);
    }
  };

  const buyPlanetUser = async () => {
    try {
      const gasPrice = await signer.getGasPrice();

      const myContract = bNetwork();

      const planetById =
        packageName === "Earth"
          ? "1"
          : packageName === "Moon"
          ? "2"
          : packageName === "Mars"
          ? "3"
          : packageName === "Mercury"
          ? "4"
          : packageName === "Venus"
          ? "5"
          : packageName === "Jupiter"
          ? "6"
          : packageName === "Saturn"
          ? "7"
          : packageName === "Uranus"
          ? "8"
          : packageName === "Neptune"
          ? "9"
          : packageName === "Pluto"
          ? "10"
          : "null";
      console.log(planetById);
      const buyPlanet = await myContract!.buyPlannet(planetById,{
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(1000000)
      });
      await buyPlanet.wait();
      console.log(buyPlanet);
      postPlanetBuyInfo(parseInt(planetById))
      setPlanetBuy(true);
    } catch (error) {
      console.log(error);
    }
  };

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
                <span
                  className="bg-yellow-500 py-1 px-5 flex  items-center gap-x-1  rounded-md hover:bg-yellow-600 duration-300"
                  onClick={buyPlanetUser}
                >
                  Upgrade
                </span>
              </button>
            ) : (
              <button
                className="bg-yellow-500 py-1 px-5  rounded-md hover:bg-yellow-600 duration-300"
                onClick={approveUSDT}
              >
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
          height={packageName == "Saturn" ? 250 : 150}
          width={packageName == "Saturn" ? 250 : 150}
          loading="lazy"
          className={`${packageName == "Saturn" ? "" : "custom-spin"}`}
        />
      </div>

      <div className="flex items-center justify-center py-3">
        {planetBuy ? (
          <div className="flex flex-col items-center gap-y-1">
            <Link
              href={treePath}
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
