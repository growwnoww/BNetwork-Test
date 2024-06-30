"use client";
import React, { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { FaRegCopy } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { tableData } from "@/utils/DirectTeamData";
import { Button } from "@/components/ui/button";
import { WalletContext } from "@/context/WalletContext";
import { SelectEntries } from "@/utils/SelectEntries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BNCoinDataTye {
    fromBNId: string;
    amount: number;
    time: Date;
    earningThrough: string;
}

interface BNCointType {
    actuallData: BNCoinDataTye[];
    totalPages: number;
}

interface valueType {
    entries: string;
}

const Page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const walletContext = useContext(WalletContext);
    // const userAddress = walletContext?.userAddress;
    const [bnCoinData, setBNcoinData] = useState<BNCointType>();
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [value, setValue] = useState<valueType>({
        entries: "10",
    });

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (walletContext?.previewAddress) {
            router.replace(`${pathname}?preview=${walletContext?.previewAddress}`);
            console.log("walletContext?.previewAddress on");
        } else {
            router.replace(`${pathname}`);
            console.log("walletContext?.previewAddress off");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }

    console.log(walletContext?.previewAddress);

    const handlePreviousClick = () => {
        setCurrentItemIndex(currentItemIndex - 1);
    };

    const handleNextClick = () => {
        const safeMaxRecycle = bnCoinData?.totalPages ?? 0;
        console.log("Safe ", safeMaxRecycle);
        console.log("current index", currentItemIndex);
        if (currentItemIndex < safeMaxRecycle - 1) {
            setCurrentItemIndex(currentItemIndex + 1);
        }
    };

    const handleSelectEntriesChange = (selectEntries: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            entries: selectEntries,
        }));
    };

    const handleToggle = (userId: number) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const getEarningMsg = (amount: number) => {
        if (amount == 0.05) {
            return "Airdrop Coin";
        } else if (amount == 0.025) {
            return "Airdrop Refer Coin";
        } else {
            return "Reward Coin";
        }
    };

    const getBNCoinEarnedTable = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/user/getBNcoinEarnedData/${userAddress?.toLowerCase()}/${
                    value.entries
                }/${currentItemIndex + 1}}`
            );

            if (response.ok) {
                const data = await response.json(); // Assuming 'data' is already an array of BNCoinDataTye
                console.log("BN coin data", data);
                setBNcoinData(data); // Directly use 'data' without wrapping it in an array
            } else {
                // Handle error response here
            }
        } catch (error) {
            console.error("Error fetching BN coin data", error);
        }
    };

    useEffect(() => {
        if (userAddress) {
            getBNCoinEarnedTable();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress, value.entries, currentItemIndex]);

    // Function to determine the status color

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">BN Coin Earned</p>
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

                        <div className="w-3/4">
                            <Table className=" divide-y divide-gray-600 rounded-lg">
                                <TableHeader className="bg-stone-900  ">
                                    <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Sr No
                                        </TableHead>

                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Form Id
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Date & time
                                        </TableHead>

                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Earned
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Earing Through
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                                    {bnCoinData?.actuallData &&
                                        bnCoinData.actuallData.map((user, index) => (
                                            <React.Fragment key={index}>
                                                <TableRow className="text-white text-center text-[12px] lg:text-md">
                                                    <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                                                        {index + 1}
                                                    </TableCell>

                                                    <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                                                        {user.fromBNId}
                                                    </TableCell>

                                                    <TableCell className=" py-2  whitespace-nowrap ">
                                                        {new Date(user.time).toLocaleString()}
                                                    </TableCell>

                                                    <TableCell className=" py-2  whitespace-nowrap ">
                                                        {user.amount}
                                                    </TableCell>

                                                    <TableCell className=" py-2  whitespace-nowrap ">
                                                        {getEarningMsg(user.amount)}
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
                                                                    <p className="w-fit ">Transaction Hash: </p>
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
                                        {currentItemIndex + 1} / {bnCoinData?.totalPages ?? 0}{" "}
                                        {/* Show current index and total pages */}
                                    </div>
                                    <button
                                        onClick={handleNextClick}
                                        disabled={currentItemIndex === (bnCoinData?.totalPages ?? 0) - 1} // Disable if this is the last item
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
                                    <SelectContent defaultValue="10">
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
