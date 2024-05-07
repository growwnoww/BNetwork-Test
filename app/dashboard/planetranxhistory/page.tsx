"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
import HeadingWrapper from "@/components/WrapperComponent/HeadingWrapper";
import { tableData } from "@/utils/DirectTeamData";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import { WalletContext } from "@/context/WalletContext";
import { useSearchParams } from "next/navigation";

interface planetDataType {
    _id: string;
    package: string;
    planetName: string;
    time: string;

    planetBuy_transaction_hash: string;
}

const Page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const walletContext = useContext(WalletContext);
    let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (userId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };
    const [planetData, setPlanetData] = useState<planetDataType[]>([]);

    const getPlanetData = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/user/getPlanetUp/${userAddress?.toLowerCase()}`
            );

            if (response.ok) {
                const data = await response.json();
                setPlanetData(data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getPlanetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress, query]);

    // Function to determine the status color

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Planet Upgrade History</p>
            </div>

            <div className="">
                <div className="py-2 align-middle sm:px-6 lg:px-8 ">
                    <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
                        

                        <div className="w-3/4">
                            <Table className=" divide-y divide-gray-600 rounded-lg">
                                <TableHeader className="bg-stone-900  ">
                                    <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Sr No
                                        </TableHead>

                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Planet
                                        </TableHead>

                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Date & Time
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Package
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                                    {planetData.map((user, index) => (
                                        <React.Fragment key={user._id}>
                                            <TableRow className="text-white text-center text-[12px] lg:text-md">
                                                <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell className=" py-2 whitespace-nowrap  font-medium flex items-center justify-center">
                                                    <Image
                                                        className="h-12 w-12  rounded-full"
                                                        width={20}
                                                        height={20}
                                                        loading="lazy"
                                                        src={`/${user.planetName}.png`}
                                                        alt="Avatar"
                                                    />
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">{user.time}</TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.package}
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
                                                    <td colSpan={8} className="px-3 py-2 whitespace-nowrap text-sm">
                                                        <div className="w-full  flex flex-col    gap-x-5 gap-y-1  p-4 text-md">
                                                            <div className="flex gap-x-2">
                                                                <p className="w-fit ">Address: {userAddress}</p>
                                                                <div className="flex items-center gap-x-2 ">
                                                                    <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                                                    <HiArrowTopRightOnSquare className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-x-2">
                                                                <p className="w-fit ">
                                                                    Transaction Hash: {user.planetBuy_transaction_hash}
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
