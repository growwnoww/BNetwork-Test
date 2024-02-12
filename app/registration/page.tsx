"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { bNetwork, signer } from "@/contract/Web3_Instance";
import { Context } from "@/components/Context";
import { IoMdPlanet } from "react-icons/io";
import { TbCards, TbUniverse } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/main/Navbar";
import axios from "axios";
import { useAccount } from "wagmi";
import useUserDetails, { userDetailsType } from "@/Hooks/useUserDetails";
import useOwner from "@/Hooks/useOwner";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import { getRedirectError } from "next/dist/client/components/redirect";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Yes");
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const [inviteAddress, setInviteAddress] = useState<string>("");
  const params = useSearchParams();
  const queryUrl = params.get("rr");

  const owner = useOwner();
  const [userDetails, setUserDetails] = useState<userDetailsType>();
  const { isConnected } = useAccount();

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const getUserDetail = async () => {
    try {
      if (!userAddress || !isConnected) {
        return;
      }

      const MyContract = bNetwork();

      const exists = await MyContract!.isUserExists(userAddress);

      if (exists) {
        const response = await MyContract!.RegisterUserDetails(userAddress);

        console.log("Got user details", response);

        const formattedResponse = {
          regUser: response.regUser,
          regTime: ethers.BigNumber.from(response.regTime).toString(), // or .toNumber() if safe
          regId: ethers.BigNumber.from(response.regId).toNumber(),
          regReferal: response.regReferal,
          regReferalId: ethers.BigNumber.from(response.regReferalId).toNumber(), // Assuming this is already a number
          teamCount: ethers.BigNumber.from(response.teamCount).toNumber(),
        };

        setUserDetails(formattedResponse);

        console.log("Refined Data", formattedResponse);
      }
    }catch(error){
      console.log("Something wrong in userDetailsFUnc",error)
    }

      
  };


// Assuming setUserDetails is a state setter function from useState
useEffect(() => {

  
  const createRegister = async () => {
    try {
      let uplineAddrLocal = "";
      let uplineBNIdLocal = "";

      // Use userDetails directly now, assuming it has been set by this point
      if (
        userDetails?.regReferal ===
          "0x0000000000000000000000000000000000000000" ||
        !userDetails?.regReferalId
      ) {
        uplineAddrLocal = owner;
        uplineBNIdLocal = "BN" + owner.substring(owner.length - 8);
      } else {
        uplineAddrLocal = userDetails.regReferal;
        uplineBNIdLocal = "BN" + userDetails.regReferal.substring(userDetails.regReferal.length - 8);
      }

      const payload = {
        reg_user_address: userAddress,
        reg_time: userDetails?.regTime,
        regId: userDetails?.regId,
        upline_referral_address: uplineAddrLocal,
        upline_referralId: userDetails?.regReferalId,
        upline_referral_BNId: uplineBNIdLocal,
        direct_count: userDetails?.teamCount,
      };

      console.log("hellow",payload)

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/createUserDetails`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error in createRegister:", error);
    }
  };


  if (userDetails) {
    createRegister();
  }
}, [userDetails]); 



  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      const signers = signer;
      const gasPrice = await signers.getGasPrice();

      const myContract = bNetwork();
      const userExisit = await myContract!.isUserExists(
        userAddress || inviteAddress
      );
      const gasFee = await myContract!.gasfees();
      const convert = Number(gasFee?._hex).toString();
      
      if (userExisit === false) {
        const registration = await myContract!.registrations(
          queryUrl || inviteAddress,
          {
            gasPrice: gasPrice,
            gasLimit: "200000",
            value: convert,
          }
        );
        await registration.wait();
        console.log(registration);
        getUserDetail();
        alert("Registration Successfully");
      } else {
        alert("You already registered");
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  const registerUserByManager = async () => {
    try {
      const signers = signer;
      const gasPrice = await signers.getGasPrice();

      const myContract = bNetwork();
      const ownerAddress = await myContract!.owner();
      const userExisit = await myContract!.UserRegister(userAddress);
      const gasFee = await myContract!.gasfees();
      const convert = Number(gasFee?._hex).toString();
      if (userExisit === false) {
        const registration = await myContract!.registrations(ownerAddress, {
          gasPrice: gasPrice,
          gasLimit: "200000",
          value: convert,
        });
        await registration.wait();
        console.log(registration);
      } else {
        alert("You already registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 place-items-center w-full h-screen ">
        <div className=" px-5 lg:ml-10">
          <div className="py-6">
            <p className="text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
              Welcome to the Believe Network
            </p>
            <span>
              Believe Network space Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Sit, error?
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-3 ">
            <div className="bg-zinc-800 rounded-md flex w-fit h-fit py-6 px-4 gap-x-1">
              <div>
                <IoMdPlanet className="text-6xl text-yellow-400" />
              </div>
              <div>
                <p className="text-xl">Planet Upgrade System</p>
                <span className="text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita, delectus{" "}
                </span>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-md flex w-fit h-fit px-3 py-6 gap-x-1">
              <div>
                <TbCards className="text-6xl text-yellow-400" />
              </div>
              <div>
                <p className="text-xl">NFT Royalty</p>
                <span className="text-xs">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Magni provident
                </span>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-md flex w-fit h-fit px-3 py-6  gap-x-1">
              <div>
                <TbUniverse className="text-6xl text-yellow-400" />
              </div>
              <div>
                <p className="text-xl">Universe</p>
                <span className="text-xs">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat suscipit{" "}
                </span>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-md flex w-fit h-fit  py-6 px-3 gap-x-3">
              <div>
                <Image src="/b-coin.png" alt="bncoin" height={80} width={80} />
              </div>

              <div>
                <p>BN Coin</p>
                <span className="text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, culpa!{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg mx-auto bg-[#121212] rounded-lg shadow-lg p-8">
          <h2 className="text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
            Registration For Believe Network
          </h2>
          <div className="mb-10">
            <p className="text-gray-400 text-center">
              Do you already have an Upline?
            </p>
            <div className="flex justify-around mt-4">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  className={classNames(
                    "text-lg font-semibold py-2 px-6 rounded-full transition-all duration-300",
                    {
                      "bg-yellow-500 hover:bg-yellow-700 text-white":
                        selectedOption === option,
                      "bg-gray-700 text-gray-300": selectedOption !== option,
                    }
                  )}
                  onClick={() => handleOptionChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {selectedOption === "Yes" ? (
            <form className="space-y-4" onSubmit={registerUser}>
              <div className="flex flex-col">
                <label htmlFor="bnId" className="text-gray-400 mb-2">
                  Enter BN Id or Address
                </label>
                <input
                  id="bnId"
                  onChange={(e) => setInviteAddress(e.target.value)}
                  value={(queryUrl as string) || inviteAddress}
                  type="text"
                  className="bg-gray-800 text-white rounded-lg p-3 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="BN Id or Address"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300"
              >
                Accept
              </button>
            </form>
          ) : (
            <button
              className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300"
              onClick={registerUserByManager}
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
