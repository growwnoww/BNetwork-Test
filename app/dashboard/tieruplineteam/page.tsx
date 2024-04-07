"use client";
import React, { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { FaRegCopy } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { tableData } from "@/utils/DirectTeamData";
import { Button } from "@/components/ui/button";
import { WalletContext } from "@/context/WalletContext";

interface TierUplineData {
    _id: string;
    reg_user_address: string;
    reg_time: string;
    latestPlanetName: string;
    isStatus: string;
    name: string;
    mobileNo: string;
    emailId: string;
}

interface TierUplineTeam {
    level: number;
    details: TierUplineData;
}

const Page = () => {
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [fetchTierUpline, setFetchTierUpline] = useState<TierUplineTeam[]>();
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (userId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const getTierUplineTeamData = async () => {
        try {
            const queryUrl = `${
                process.env.NEXT_PUBLIC_URL
            }/user/getTierUplineTeam?reg_user_address=${userAddress?.toLowerCase()}`;

            const response = await fetch(queryUrl);

            if (response.ok) {
                const data: TierUplineTeam[] = await response.json();
                console.log(data);
                const reverseData = data.reverse();
                console.log("data", reverseData);
                setFetchTierUpline(reverseData);
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        if (userAddress) {
            getTierUplineTeamData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    // Function to determine the status color

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Tier Upline Team</p>
            </div>

            <div className="">
                <div className="py-2 align-middle sm:px-6 lg:px-8 ">
                    <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
                        <div className="w-3/4 flex flex-col md:flex-row  items-center justify-between">
                            <div className=" w-full flex flex-col items-end md:items-start ">
                                <label className="">Filter</label>
                                <Input type="text" placeholder="Enter BN Id or Address" className="w-[140px] h-8" />
                            </div>
                        </div>

                        <div className="w-3/4 mb-5">
                            <Table className=" divide-y divide-gray-600 rounded-lg">
                                <TableHeader className="bg-stone-900  ">
                                    <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Sr No
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Date & time
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Tier No
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Planet
                                        </TableHead>

                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Status
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                                    {fetchTierUpline?.map((user, index) => (
                                        <React.Fragment key={user.details._id}>
                                            <TableRow className="text-white text-center text-[12px] lg:text-md">
                                                <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.details.reg_time}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.level}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.details.latestPlanetName}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap  ">
                                                    <div className="w-full flex items-center justify-center">
                                                        <p
                                                            className={`w-fit p-1 px-2 rounded-md ${
                                                                user.details.isStatus === "Active"
                                                                    ? "bg-green-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        >
                                                            {user.details.isStatus}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className=" py-2  whitespace-nowrap font-medium">
                                                    <Button onClick={() => handleToggle(user.details._id)}>
                                                        {expanded[user.details._id] ? "Hide" : "Show"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            {expanded[user.details._id] && (
                                                <TableRow className="text-white text-center">
                                                    {/* Notice the colSpan should be equal to the number of columns in the table */}
                                                    <TableCell
                                                        colSpan={8}
                                                        className="px-3 py-2 whitespace-nowrap text-sm"
                                                    >
                                                        <div className="w-full  flex flex-col    gap-x-5   p-4 text-md">
                                                            <div className="flex gap-x-2">
                                                                <p className="w-fit ">
                                                                    Address: {user.details.reg_user_address}
                                                                </p>
                                                                <div className="flex items-center gap-x-2 ">
                                                                    <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                                                    <HiArrowTopRightOnSquare className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                                                </div>
                                                            </div>

                                                            <div className="w-fit flex flex-col gap-y-1 text-left">
                                                                <p>Name : {user.details.name}</p>
                                                                <p>Mobile No: +{user.details.mobileNo}</p>
                                                                <p>Email Id: {user.details.emailId}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
