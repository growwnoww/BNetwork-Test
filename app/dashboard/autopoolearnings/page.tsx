"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { tableData } from "@/utils/DirectTeamData";
import { SelectData } from "@/utils/SelectData";
import { SelectLevel } from "@/utils/SelectLevel";
import { WalletContext } from "@/context/WalletContext";

interface valueType {
    recycleVal: string;
    level: string;
    package: string;
}

interface UserDetails {
    _id: string;
    bn_id: string;
    planetName: string;
    reg_user_address: string;
    universeSlot: number;
    children: string[];
    parent: string;
    currentLevel: number;
    currentPosition: number;
    autoPoolEarning: number;
    isRoot: boolean;
    recycle: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IndexMapping {
    userLevel: number;
    userPosition: number;
    userDetails: UserDetails[];
}

interface RecycleItem {
    recycleCount: number;
    indexMappings: IndexMapping[];
}

interface AutoPoolTableData {
    data: RecycleItem[];
}

const Page = () => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [autoPoolTableData, setAutoPoolTableData] = useState<AutoPoolTableData>({ data: [] });
    const [value, setValue] = useState<valueType>({
        recycleVal: "",
        level: "",
        package: "",
    });
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;

    const handleToggle = (userId: any) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
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

    const getAutoPoolData = async () => {
        try {
            const query = `${process.env.NEXT_PUBLIC_URL}/user/getAutoPoolTable/${userAddress}/${value?.package}/${value?.recycleVal}/${value?.level}`;
            console.log("query", query);
            const response = await fetch(query);

            if (response.ok) {
                const data: AutoPoolTableData = await response.json();
                setAutoPoolTableData(data);
            } else {
                console.log("Failed to fetch auto pool table data");
            }
        } catch (error) {
            console.error("Error fetching auto pool table data:", error);
        }
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        console.log("data", value);
        await getAutoPoolData();
    };

    useEffect(() => {
        getAutoPoolData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to determine the status color

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Auto Pool Earnings</p>
            </div>

            <div className="">
                <div className="py-2 align-middle sm:px-6 lg:px-8 ">
                    <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
                        <div className="w-3/4 flex flex-col md:flex-row  items-center justify-between">
                            <div className=" w-full flex flex-col items-end md:items-start ">
                                <label className="">Filter</label>
                                <Input
                                    type="text"
                                    placeholder="Enter BN Id or Address"
                                    className="w-[140px] h-8 lg:h-9 lg:w-[170px]"
                                />
                            </div>

                            <div className="w-full flex flex-row justify-end gap-x-3 ">
                                <form
                                    action=""
                                    onSubmit={submitHandler}
                                    className="w-full flex flex-row justify-end gap-x-3 "
                                >
                                    <div className="flex items-center gap-x-3 ">
                                        <div>
                                            <p>Packages</p>
                                            <Select
                                                name="selectedPackage"
                                                value={value.package}
                                                onValueChange={handleSelectPackageChange}
                                            >
                                                <SelectTrigger className="w-[180px] border border-yellow-400">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent defaultValue="Earth">
                                                    {SelectData.map((item) => (
                                                        <SelectItem key={item.id} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <p>Recycle :</p>
                                        <Input
                                            type="number"
                                            defaultValue="1"
                                            placeholder="Enter Recycle Number"
                                            className="w-[140px] h-8 lg:h-9 lg:w-[170px]"
                                            name="recycleVal"
                                            value={value.recycleVal}
                                            onChange={(e) => setValue({ ...value, recycleVal: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <p>Levels</p>
                                        <Select
                                            name="selectedLevel"
                                            value={value.level}
                                            onValueChange={handleSelectLevelChange}
                                        >
                                            <SelectTrigger className="w-[70px] h-8 lg:w-[95px] lg:h-10  ">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent defaultValue="1">
                                                {SelectLevel.map((item) => (
                                                    <SelectItem key={item.id} value={item.value}>
                                                        {item.data}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button type="submit" variant={"custom_yellow"} className="mt-6 h-7 md:h-10">
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className="w-3/4">
                            <Table className=" divide-y divide-gray-600 rounded-lg">
                                <TableHeader className="bg-stone-900  ">
                                    <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Sr No
                                        </TableHead>

                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Tier No
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Date & time
                                        </TableHead>

                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            From BN Id
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Earned
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Planet Package
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px] lg:text-[14px]">
                                    {autoPoolTableData.data.map((recycleItem, index) =>
                                        recycleItem.indexMappings.map((mapping, mappingIndex) =>
                                            mapping.userDetails.map((user, userIndex) => (
                                                <React.Fragment key={user._id}>
                                                    <TableRow className="text-white text-center text-[12px] lg:text-md">
                                                        <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                                                            {user._id} {/* or any other unique property */}
                                                        </TableCell>

                                                        <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                                                            {user.bn_id}
                                                        </TableCell>

                                                        <TableCell className="py-2 whitespace-nowrap">
                                                            {user.createdAt}{" "}
                                                            {/* Assuming you want to display the creation date */}
                                                        </TableCell>

                                                        <TableCell className="py-2 whitespace-nowrap">
                                                            {user.bn_id}
                                                        </TableCell>

                                                        <TableCell className="py-2 whitespace-nowrap">
                                                            {user.planetName}{" "}
                                                            {/* Assuming `earningThrough` maps to `planetName` */}
                                                        </TableCell>

                                                        <TableCell className="py-2 whitespace-nowrap">
                                                            {user.autoPoolEarning}
                                                        </TableCell>

                                                        <TableCell className="py-2 whitespace-nowrap font-medium">
                                                            <Button onClick={() => handleToggle(user._id)}>
                                                                {expanded[user._id] ? "Hide" : "Show"}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    {expanded[user._id] && (
                                                        <tr className="text-white text-center">
                                                            <td
                                                                colSpan={7}
                                                                className="px-3 py-2 whitespace-nowrap text-sm"
                                                            >
                                                                <div className="w-full flex flex-col gap-x-5 gap-y-1 p-4 text-md">
                                                                    <div className="flex gap-x-2">
                                                                        <p className="w-fit">
                                                                            Transaction Hash: {user.reg_user_address}{" "}
                                                                            {/* Assuming `address` maps to `reg_user_address` */}
                                                                        </p>
                                                                        {/* Icons and other interactive elements */}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="w-3/4   my-5 flex flex-col lg:flex-row items-center justify-between gap-y-4  ">
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

                            <div className="order-1 lg:order-2 text-sm flex items-center gap-x-2">
                                <p>Show Entries :</p>
                                <Select>
                                    <SelectTrigger className="w-[80px] lg:w-[90px]">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ten">10</SelectItem>
                                        <SelectItem value="twenty_five">25</SelectItem>
                                        <SelectItem value="fifty">50</SelectItem>
                                        <SelectItem value="hundred">100</SelectItem>
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
