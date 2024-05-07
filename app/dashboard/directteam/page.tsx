"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";

import {Input} from'@/components/ui/input';
import { Button } from "@/components/ui/button";
import { SelectEntries } from "@/utils/SelectEntries";
import { WalletContext } from "@/context/WalletContext";
import { timeStamp } from "console";
import { isDate } from "util/types";
import { useSearchParams } from "next/navigation";

interface DirectTeamType {
    bn_id: string;
    reg_user_address: string;
    reg_time: string;
    name: string;
    emailId: string;
    mobileNo: string;
    latestPlanetName: string;
    isStatus: string;
    direct_count: number;
    totalTeamCount: number;
}

interface DiretTeamAll{
    user:DirectTeamType[];
    totalPages:number;
}

interface valueType {
    level: string;
    package: string;
    entries: string;
}


const Page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [directTeamData, setDirectTeamData] = useState<DiretTeamAll>();

    const handleToggle = (userId: number) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const [value, setValue] = useState<valueType>({
        level: "1",
        package: "Earth",
        entries: "10",
      });

    const [currentItemIndex, setCurrentItemIndex] = useState(0); // Starts from 0 for the first item
    const items = Array.from(
      { length: 100 },
      (_, index) => `Recycle ${index + 1}`
    );
    // Event handlers for item navigation
    const handlePreviousClick = () => {
      setCurrentItemIndex(currentItemIndex - 1);
    };
  
    const handleNextClick = () => {
      const safeMaxRecycle = directTeamData?.totalPages ?? 0;
      console.log("Safe ", safeMaxRecycle);
      console.log("current index", currentItemIndex);
      if (currentItemIndex < safeMaxRecycle - 1) {
        setCurrentItemIndex(currentItemIndex + 1);
      }
    };
  

    const walletContext = useContext(WalletContext);
    let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }

    const unixToTime = (_reg_time: string) => {
        if (directTeamData) {
            let timeStamp = parseInt(_reg_time);
            console.log("Time", timeStamp);
            const date = new Date(timeStamp * 1000);
            const istDate = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

            return istDate;
        }
    };

    const handleSelectEntriesChange = (selectEntries: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            entries: selectEntries,
        }));
    };

    const getDirectTeamData = async () => {
        try {
            const response = await axios(
                `${process.env.NEXT_PUBLIC_URL}/user/getDirectTeam/${userAddress?.toLowerCase()}/${currentItemIndex+1}/${value.entries}}`
            );

            if (response.data) {
                const data: DiretTeamAll = await response.data;
                console.log("direct team data", data);
                setDirectTeamData(data);
            } else {
                console.log("Something went wrong in fetching direct team data");
            }
        } catch (error) {
            console.log("Something went wrong in direct team", error);
        }
    };

    useEffect(() => {
        getDirectTeamData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItemIndex,value.entries, userAddress, query]);
    // Function to determine the status color

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Direct Team</p>
            </div>

            <div className="">
                <div className="py-2 align-middle sm:px-6 lg:px-8 ">
                    <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
                        <div className="w-3/4 flex flex-col md:flex-row  items-center justify-between">
                            <div className=" w-full flex flex-col items-end md:items-start ">
                                <label className="">Filter</label>
                                <Input type="text" placeholder="Enter BN Id or Address" className="w-[180px] h-8" />
                            </div>
                        </div>

                        <div className="w-3/4">
                            <Table className=" divide-y divide-gray-600 rounded-lg">
                                <TableHeader className="bg-stone-900  ">
                                    <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Planet
                                        </TableHead>
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            BN Id
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Date & time
                                        </TableHead>
                                       
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Direct Team
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Total Team
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Status
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                                    {directTeamData && directTeamData.user.map((user, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow className="text-white text-center text-[12px] lg:text-md">
                                                <TableCell className=" py-2 whitespace-nowrap  font-medium flex items-center justify-center">
                                                    <Image
                                                        className="h-12 w-12  rounded-full"
                                                        width={20}
                                                        height={20}
                                                        loading="lazy"
                                                        src={`${
                                                            user.latestPlanetName === ""
                                                                ? "/just_reg.png"
                                                                : `/${user.latestPlanetName}.png`
                                                        }`}
                                                        // src='/just_reg.png'
                                                        alt="Avatar"
                                                    />
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                                                    {user.bn_id}
                                                </TableCell>
                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {unixToTime(user.reg_time)}
                                                </TableCell>

                                              

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.direct_count}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.totalTeamCount}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap  ">
                                                    <div className="w-full flex items-center justify-center">
                                                        <p
                                                            className={`w-fit p-1 px-2 rounded-md ${
                                                                user.isStatus === "Active"
                                                                    ? "bg-green-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        >
                                                            {" "}
                                                            {user.isStatus}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className=" py-2  whitespace-nowrap font-medium">
                                                    <Button onClick={() => handleToggle(index)}>
                                                        {expanded[index] ? "Hide" : "Show"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            {expanded[index] && (
                                                <tr className="text-white text-center">
                                                    {/* Notice the colSpan should be equal to the number of columns in the table */}
                                                    <td colSpan={8} className="px-3 py-2 whitespace-nowrap text-sm">
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

                                                            <div className="w-fit flex flex-col gap-y-1 text-left">
                                                                <p>Name: {user.name}</p>
                                                                <p>Mobile No: +{user.mobileNo}</p>
                                                                <p>Email Id: {user.emailId}</p>
                                                               
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>


              <div className="w-3/4   my-5 flex flex-col lg:flex-row items-center justify-between  ">
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
                      {currentItemIndex + 1} / {directTeamData?.totalPages ?? 0}{" "}
                      {/* Show current index and total pages */}
                    </div>
                    <button
                      onClick={handleNextClick}
                      disabled={
                        currentItemIndex ===
                        (directTeamData?.totalPages ?? 0) - 1
                      } // Disable if this is the last item
                      style={{ marginLeft: "10px" }}
                      className="border-2 border-yellow-500 h-7 p-3 flex items-center  rounded-md hover:bg-stone-700 duration-300"
                    >
                      &rarr;
                    </button>
                  </div>
                  </div>

                  <div className="order-1 lg:order-2 text-sm my-5">
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
                    
           



                      {/* hello */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
