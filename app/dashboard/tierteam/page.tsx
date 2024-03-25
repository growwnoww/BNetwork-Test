"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";
import { SelectTierData } from "@/utils/SelectTierLevel";
import { SelectTierTeamPackage } from "@/utils/SelectTierTeamPackage";
import { WalletContext } from "@/context/WalletContext";
import { SelectEntries } from "@/utils/SelectEntries";

interface valueType {
    level: string;
    package: string;
    entries: string;
}

interface tierTeamDataType {
    _id: string;
    bn_id: string;
    reg_user_address: string;
    reg_time: string;
    upline_referral_BNId: string;
    latestPlanetName: string;
    isStatus: string;
    tierEarnings: boolean;
}

const Page = () => {
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [fetchTierData, setFetchTierData] = useState<tierTeamDataType[]>();
    const [value, setValue] = useState<valueType>({
        level: "1",
        package: "",
        entries: "10",
    });

    const handleToggle = (userId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const unixToTime = (_reg_time: string) => {
        if (fetchTierData) {
            let timeStamp = parseInt(_reg_time);
            console.log("Time", timeStamp);
            const date = new Date(timeStamp * 1000);
            const istDate = date.toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            });

            return istDate;
        }
    };

    const handleSelectPackageChange = (selectedPackage: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            package: selectedPackage,
        }));
    };

    const handleSelectLevelChange = (selectedLevel: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            level: selectedLevel,
        }));
    };

    const handleSelectEntriesChange = (selectEntries: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            entries: selectEntries,
        }));
    };

    const getTierTeam = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_URL}/user/getTierUserlevel/${userAddress?.toLowerCase()}/${
                value.level
            }/${value.entries}/${value.package}`;
            console.log(url);
            const response = await axios(url);

            if (response.data) {
                const data: tierTeamDataType[] = await response.data;
                console.log(data);
                setFetchTierData(data);
            }
        } catch (error) {}
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        console.log("data", value);
        await getTierTeam();
    };

    useEffect(() => {
        getTierTeam();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value.level, value.entries]);

    // Function to determine the status color

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Tier Team</p>
            </div>

            <div className="">
                <div className="py-2 align-middle sm:px-6 lg:px-8 ">
                    <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
                        <div className="w-3/4 flex flex-col md:flex-row   justify-between">
                            <div className=" w-full flex flex-row md:flex-col items-end md:items-start justify-end order-2 md:order-1 gap-x-3 my-4  ">
                                <label className="">Filter: </label>
                                <Input
                                    type="text"
                                    placeholder="Enter BN Id or Address"
                                    className="w-[80%] h-7 lg:h-9 lg:w-[170px]"
                                />
                            </div>

                            <div className="order-1 md:order-2">
                                <div className="text-right my-3 ">
                                    <p className="text-lg lg:text-xl">Business: $ 0.00 </p>
                                </div>

                                <div className="w-full ">
                                    <form
                                        action=""
                                        className=" flex flex-col md:flex-row w-auto items-center justify-center lg:flex-row lg:justify-end gap-5 lg:gap-x-3 "
                                        onSubmit={submitHandler}
                                    >
                                        <div className="w-full flex md:flex-col gap-5 md:gap-1">
                                            <div className="">
                                                <p>Levels:</p>
                                            </div>
                                            <div className="w-full flex justify-end items-end">
                                                <Select
                                                    name="selectTieTeamLevels"
                                                    value={value.level}
                                                    onValueChange={handleSelectLevelChange}
                                                >
                                                    <SelectTrigger className="w-[180px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                    <SelectContent defaultValue="Earth">
                                                        {SelectTierData.map((item: any) => (
                                                            <SelectItem key={item.id} value={item.value}>
                                                                {item.data}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row w-full items-center gap-x-3 ">
                                            <div className="flex md:flex-col gap-5 md:gap-1  w-full">
                                                <div className="flex items-start justify-start  ">
                                                    <p>Packages:</p>
                                                </div>
                                                <div className="w-full flex items-end justify-end">
                                                    <Select
                                                        name="selectTierTeamPackages"
                                                        value={value.package}
                                                        onValueChange={handleSelectPackageChange}
                                                    >
                                                        <SelectTrigger className="w-[180px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                                                            <SelectValue placeholder="" />
                                                        </SelectTrigger>
                                                        <SelectContent defaultValue="Earth">
                                                            {SelectTierTeamPackage.map((item: any) => (
                                                                <SelectItem key={item.id} value={item.value}>
                                                                    {item.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                variant={"custom_yellow"}
                                                className="mt-6 h-7 px-[45%] md:px-4 md:h-9"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="w-[86%] overflow-x-scroll lg:overflow-x-hidden">
                            {fetchTierData?.length !== 0 ? (
                                <Table className=" divide-y divide-gray-600 rounded-lg">
                                    <TableHeader className="bg-stone-900  ">
                                        <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center ">
                                            <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                                Current Planet
                                            </TableHead>
                                            <TableHead scope="col" className="mx-10 lg:mx-0 text-center tracking-wider">
                                                BN Id
                                            </TableHead>
                                            <TableHead
                                                scope="col"
                                                className="mx-10  lg:mx-0 lg:px-0 py-3 text-center tracking-wider"
                                            >
                                                Date & time
                                            </TableHead>
                                            <TableHead scope="col" className="px-3  lg:px-0 text-center tracking-wider">
                                                Tier No
                                            </TableHead>
                                            <TableHead scope="col" className="mx-10 lg:mx-0 text-center tracking-wider">
                                                Upline Id
                                            </TableHead>

                                            <TableHead
                                                scope="col"
                                                className="px-10 lg:px-0 py-3 text-center tracking-wider"
                                            >
                                                Status
                                            </TableHead>
                                            <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                                        {fetchTierData &&
                                            fetchTierData.map((user, userIndex) => (
                                                <React.Fragment key={`${userIndex}`}>
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
                                                        <TableCell className="px-4 lg:px-0 py-2  whitespace-nowrap ">
                                                            {unixToTime(user.reg_time)}
                                                        </TableCell>

                                                        <TableCell className="px-8 lg:px-0 py-2  whitespace-nowrap ">
                                                            {value.level}
                                                        </TableCell>

                                                        <TableCell className=" py-2 whitespace-nowrap ">
                                                            {user.upline_referral_BNId}
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
                                                            <Button onClick={() => handleToggle(user._id)}>
                                                                {expanded[user._id] ? "Hide" : "Show"}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    {expanded[user._id] && (
                                                        <TableRow className="text-white text-center">
                                                            {/* Notice the colSpan should be equal to the number of columns in the table */}
                                                            <TableCell
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
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-red-500 text-center font-semibold text-xl lg:text-3xl mt-2">
                                    No one present at this position.
                                </div>
                            )}
                        </div>

                        <div className="w-3/4   my-5 flex flex-col lg:flex-row items-center justify-between  ">
                            <div className="order-2 lg:order-1">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
