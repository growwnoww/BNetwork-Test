"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { FaRegCopy } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { tableData } from "@/utils/DirectTeamData";
import { Button } from "@/components/ui/button";
import { WalletContext } from "@/context/WalletContext";
import { Are_You_Serious } from "next/font/google";
import { TierEarningData } from "@/utils/TierEarningData";
import axios from "axios";
import { SelectEntries } from "@/utils/SelectEntries";


interface TierEarningType{
  _id:string
  bn_id:string;
  reg_user_address:string;
  reg_time:string;
  directEarnings:boolean;
  tranactionHash:string;
  level:number;
}

interface TierEarningObject{
  users:TierEarningType[];
  totalPages:number;
}

const Page = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [tierEarnings,setTierEarnings] = useState<TierEarningObject| null>()
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const totalTierEarning = walletContext?.planetStatus || 0;
  console.log(totalTierEarning);
  let srno = 0;
  const [currentItemIndex, setCurrentItemIndex] = useState(0); 

  const handlePreviousClick = () => {
    setCurrentItemIndex(currentItemIndex - 1);
  };

  const handleNextClick = () => {
    const safeMaxRecycle = tierEarnings?.totalPages ?? 0;
    console.log("Safe ", safeMaxRecycle);
    console.log("current index", currentItemIndex);
    if (currentItemIndex < safeMaxRecycle - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };
  
  const [value, setValue] = useState({
    level:"1",
    entries: "10",
  });

  const handleSelectEntriesChange = (selectEntries: string) => {
    setValue((prevState: any) => ({
      ...prevState,
      entries: selectEntries,
    }));
  };

  
  const handleSelectLevelChange = (selectedLevel: string) => {
    setCurrentItemIndex(0)
    setValue((prevState: any) => ({
      ...prevState,
      level: selectedLevel,
    }));
  };


  const handleToggle = (userId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const getTierEarningsData = async () =>{
    try {
      const query =`${process.env.NEXT_PUBLIC_URL}/user/getTierEarning/${userAddress?.toLowerCase()}/${value.level}/${value.entries}/${currentItemIndex+1}`;

      const response = await axios.get<TierEarningObject>(query);

      if(response.data){
        const data:TierEarningObject = response.data;
        setTierEarnings(data)

      }
    } catch (error) {
      
    }
  }

  const setEarningAmount = (index: number) => {
    if (index <= 3) return 0.09;
    else if (index <= 8) return 0.06;
    else if (index === 9) return 0.03;
    else if (index <= 13) return 0.15;
    else if (index <= 15) return 0.21;
  };
  
  useEffect(()=>{
    getTierEarningsData()
  },[value.level,value.entries,currentItemIndex])
  // Function to determine the status color

  return (
    <div className="flex flex-col">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Tier Earnings
        </p>
      </div>

      <div className="">
        <div className="py-2 align-middle sm:px-6 lg:px-8 ">
          <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
            <div className="w-3/4 flex flex-col gap-y-3 md:flex-row  items-center justify-around">
              <div className="order-3 lg:order-1  w-full flex lg:flex-col   gap-x-7  items-end md:items-start ">
                <label className="">Search: </label>
                <Input
                  type="text"
                  placeholder="Enter BN Id or Address"
                  className="w-[90%] h-8"
                />
              </div>

              <div className="order-1 lg:order-2  w-full flex flex-row lg:flex-col items-center justify-between gap-x-4">
                <p>Total Tier Earning :</p>
                <p>{Number(totalTierEarning.tierEarningsAmount).toFixed(2)} $</p>
              </div>

              <div className="order-2 lg:order-3  w-full flex md:flex-row lg:items-center lg:justify-center gap-5 md:gap-1">
                      <div className=" w-full flex lg:justify-end">
                        <p>Levels:</p>
                      </div>
                      <div className="w-full flex justify-end items-end ">
                        <Select
                          name="selectTieTeamLevels"
                          value={value.level}
                          onValueChange={handleSelectLevelChange}
                        >
                          <SelectTrigger className="w-[180px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent >
                            {TierEarningData.map((item: any) => (
                              <SelectItem key={item.id} value={item.value}>
                                {item.data}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

            </div>

            <div className="w-3/4">
              <Table className=" divide-y divide-gray-600 rounded-lg">
                <TableHeader className="bg-stone-900  ">
                  <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                    <TableHead
                      scope="col"
                      className=" px-5 lg:px-0 py-5 text-center "
                    >
                      Sr No
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" px-5 lg:px-0 py-5 text-center "
                    >
                      Current Planet
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" px-5 lg:px-0 py-5 text-center "
                    >
                      From Id
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Date & time
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Tier No
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Package
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Earning
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                  {
                    tierEarnings && tierEarnings.users.map((user,index)=>{
                      return (
                        <React.Fragment key={index}>
                          <TableRow className="text-white text-center text-[12px] lg:text-md">
                            <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                              {index+1}
                            </TableCell>

                            <TableCell className=" py-2 whitespace-nowrap  font-medium flex items-center justify-center">
                              <Image
                                className="h-12 w-12  rounded-full"
                                width={20}
                                height={20}
                                loading="lazy"
                                src="/Earth.png"
                                alt="Avatar"
                              />
                            </TableCell>

                            <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm  ">
                              {user.bn_id}
                            </TableCell>
                            <TableCell className=" py-2  whitespace-nowrap ">
                              {user.reg_time}
                            </TableCell>

                            <TableCell className=" py-2  whitespace-nowrap ">
                              {user.level}
                            </TableCell>

                            <TableCell className=" py-2  whitespace-nowrap ">
                              Earth
                            </TableCell>

                            <TableCell className=" py-2  whitespace-nowrap ">
                              {setEarningAmount(user.level)}
                            </TableCell>

                            <TableCell className=" py-2  whitespace-nowrap font-medium">
                              <Button onClick={() => handleToggle(user._id)}>
                                {expanded[user._id] ? "Hide" : "Show"}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expanded[user._id] && (
                            <tr className="text-white text-center">
                              {/* Notice the colSpan should be equal to the number of columns in the table */}
                              <td
                                colSpan={8}
                                className="px-3 py-2 whitespace-nowrap text-sm"
                              >
                                <div className="w-full  flex flex-col    gap-x-5 gap-y-1  p-4 text-md">
                                  <div className="flex gap-x-2">
                                    <p className="w-fit ">
                                      Address: {user.reg_user_address}
                                    </p>
                                    <div className="flex items-center gap-x-2 ">
                                      <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                      <HiArrowTopRightOnSquare className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                    </div>
                                  </div>
                                  <div className="flex gap-x-2">
                                    <p className="w-fit ">
                                      Transaction Hash:{" "}
                                      {user.reg_user_address}
                                    </p>
                                    <div className="flex items-center gap-x-2 ">
                                      <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                      <HiArrowTopRightOnSquare className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </div>

            <div className="w-3/4   my-5 flex flex-col lg:flex-row items-center justify-between gap-y-4  ">
              <div className="order-2 lg:order-1">
              <div className="flex items-center justify-center">
                    <button
                      onClick={handlePreviousClick}
                      disabled={currentItemIndex === 0} // Disable if this is the first item
                      style={{ marginRight: "10px" }}
                      className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
                    >
                      &larr;
                    </button>
                    <div style={{ margin: "20px", textAlign: "center" }}>
                      {currentItemIndex + 1} / {tierEarnings?.totalPages ?? 0}{" "}
                      {/* Show current index and total pages */}
                    </div>
                    <button
                      onClick={handleNextClick}
                      disabled={
                        currentItemIndex ===
                        (tierEarnings?.totalPages ?? 0) - 1
                      } // Disable if this is the last item
                      style={{ marginLeft: "10px" }}
                      className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
                    >
                      &rarr;
                    </button>
                  </div>
              </div>

              <div className="order-1 lg:order-2 text-sm ">
                <p>Show Entries</p>
                <Select
                  name="selectEntries"
                  value={value.entries}
                  onValueChange={handleSelectEntriesChange}
                >
                  <SelectTrigger className="w-[110px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent defaultValue="Earth">
                    {SelectEntries.map((item: any) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.data}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
