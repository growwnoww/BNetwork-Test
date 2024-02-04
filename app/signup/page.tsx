"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { IoMdPlanet } from "react-icons/io";
import { TbCards, TbUniverse } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/main/Navbar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Yes");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-2 place-items-center    w-full h-screen ">
        <div className=" px-5 lg:ml-10 gap-y-3">
          <div className="py-6 flex flex-col items-start justify-start">
            <p className="text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
              Registration for Believe Network
            </p>
            <span>
              Registration by invite you become part of the partners of the user
              who invited you by his link.
            </span>
          </div>

          <div className="flex gap-x-4 py-2">
            <div className="text-center">
              <Image
                src="/Pluto.png"
                alt="pluto"
                height={80}
                width={80}
                loading="lazy"
              />

              <p>Pluto</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xl">Your Upline</p>
              <p className="text-xs">
                0x5Bdba3d3Ac5Cb26E483F59f1983f26890c01020f
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 h-1/4  gap-x-3 gap-y-3 ">
            <div className="bg-zinc-800 rounded-md py-1 gap-x-1">
              <div className="text-center">
                <p className="text-xl">Direct Believer partner</p>
                <span className="text-2xl ">2103</span>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-md  py-1  gap-x-1">
              <div className="text-center">
                <p className="text-xl">Registration Date</p>
                <span className="text-2xl">02.02.2024</span>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-md  py-1  gap-x-1">
              <div className="text-center">
                <p className="text-xl">Total Team</p>
                <span className="text-2xl">301</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4  mx-auto bg-[#121212] rounded-lg shadow-lg py-16 px-8 flex flex-col gap-y-5  ">
          <div>
            <h2 className="text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent  font-bold ">
              Registration For Believe Network
            </h2>

            <div >
              <p className="text-sm text-zinc-500">
                Confirm that you agree with Terms of use and press the button
                Sing up
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" className="bg-slate-700" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>


          <div className="bg-yellow-600 text-center py-1 my-10 rounded-md">
            <Link href='/dashboard'><button>sign up</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
