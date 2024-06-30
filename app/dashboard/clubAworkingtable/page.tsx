"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaRegCopy } from "react-icons/fa";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import { SelectEntries } from "@/utils/SelectEntries";
import { SelectData } from "@/utils/SelectData";
import { SelectLevel } from "@/utils/SelectLevel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DierctEarningType {
    fromBNId: string;
    reg_user_address: string;
    time: string;
    amount: Number;
    planetName: string;
}

interface DirectEarningObject {
    users: DierctEarningType[];
    totalPages: number;
}

const Page = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const [directEarnings, setDirectEarnings] = useState<DirectEarningObject | null>(null);
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const walletContext = useContext(WalletContext);
    // const userAddress = walletContext?.userAddress;
    const [displayUser, setDisplayUser] = useState<DierctEarningType | null>(null);
    const [searchUser, setSearchUser] = useState({ user: "" });
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

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

    const handlePreviousClick = () => {
        if (currentItemIndex > 0) {
            setCurrentItemIndex(currentItemIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (directEarnings && currentItemIndex < directEarnings.totalPages - 1) {
            setCurrentItemIndex(currentItemIndex + 1);
        }
    };

    const handleToggle = (userId: number) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const [value, setValue] = useState({
        entries: "10",
        package: "Earth",
    });

    const handleSelectEntriesChange = (selectEntries: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            entries: selectEntries,
        }));
    };

    const handleSelectPackageChange = (selectedPackage: string) => {
        setValue((prevState: any) => ({
            ...prevState,
            package: selectedPackage,
        }));
    };

    const getPlanetName = (planetId: number): string | undefined => {
        const planetNames: { [id: number]: string } = {
            1: "Earth 10$",
            2: "Moon 25$",
            3: "Mars 50$",
            4: "Mercury 100$",
            5: "Venus 250$",
            6: "Jupiter 500$",
            7: "Saturn 1000$",
            8: "Uranus 2500$",
            9: "Neptune 5000$",
            10: "Pluto 10000$",
        };

        return planetNames[planetId];
    };

    const getDirectTeamData = async () => {
        try {
            console.log("Fetching direct earnings data...");
            const queryData = `${process.env.NEXT_PUBLIC_URL}/clubA/getUpgradeTable/${userAddress?.toLowerCase()}/${
                value.entries
            }/${currentItemIndex + 1}/${value.package}`;
            const response = await axios.get<DirectEarningObject>(queryData);
            console.log("Response:", response.data);

            if (response.data) {
                setDirectEarnings(response.data);
            }
        } catch (error) {
            console.error("Error fetching direct team data:", error);
        }
    };

    const handleSearchUser = async (event: any) => {
        const value = event.target.value;
        setSearchUser({ user: value });

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL}/user/getDirectEarningSearch/${userAddress?.toLowerCase()}/${value}`
            );
            const data: DierctEarningType = response.data;
            setDisplayUser(data);
        } catch (error) {
            console.error("Error searching user:", error);
        }
    };
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        console.log("data", value);
        await getDirectTeamData();
    };

    useEffect(() => {
        // Check if searchUser.user is empty and displayUser is null
        if (!searchUser.user && !displayUser) {
            getDirectTeamData();
        } else {
            // Reset directEarnings to null if searchUser or displayUser is not null
            setDirectEarnings(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchUser.user, displayUser, value.entries, currentItemIndex, userAddress, query]);

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Club-A Working Table</p>
            </div>

            <div>
                <div className="py-2 align-middle sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center gap-y-6 sm:rounded-lg">
                        <div className="w-3/4 flex flex-col md:flex-row items-center justify-between">
                            <div className="w-full flex flex-row lg:flex-col gap-x-3 items-end md:items-start">
                                <label className="">Search: </label>
                                <Input
                                    type="text"
                                    name="searchBar"
                                    value={searchUser.user}
                                    onChange={(e) => handleSearchUser(e)}
                                    placeholder="Enter BN Id or Address"
                                    className="w-[80%] lg:w-[45%] h-8"
                                />
                            </div>

                            <div className="order-1 md:order-2 w-full flex flex-row justify-end gap-x-3 ">
                                <form
                                    action=""
                                    onSubmit={submitHandler}
                                    className="w-full flex flex-col items-center md:flex-row md:items-center md:justify-center justify-end gap-x-3  gap-3"
                                >
                                    <div className="w-full flex flex-row md:flex-col md:items-center md:justify-center gap-x-3 ">
                                        <div className="w-full items-start justify-start md:items-center md:justify-center">
                                            <p>Packages:</p>
                                        </div>
                                        <div className="w-full items-start justify-start md:items-center md:justify-center">
                                            <Select
                                                name="selectedPackage"
                                                value={value.package}
                                                onValueChange={handleSelectPackageChange}
                                            >
                                                <SelectTrigger className="w-[180px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent defaultValue="Earth">
                                                    {SelectData.map((item: any) => (
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
                                        className="mt-2 md:mt-auto h-7 px-[45%] md:px-3 md:h-9"
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className="w-3/4">
                            {displayUser && Object.keys(displayUser).length > 0 ? (
                                <Table className="divide-y divide-gray-600 rounded-lg">
                                    <TableHeader className="bg-stone-900">
                                        <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                            <TableHead scope="col" className="px-5 lg:px-0 py-5 text-center">
                                                Sr No
                                            </TableHead>
                                            <TableHead scope="col" className="px-5 lg:px-0 py-5 text-center">
                                                Planet
                                            </TableHead>

                                            <TableHead scope="col" className="py-3 text-center tracking-wider">
                                                Date & Time
                                            </TableHead>
                                            <TableHead scope="col" className="py-3 text-center tracking-wider">
                                                Planet
                                            </TableHead>
                                            <TableHead scope="col" className="text-center tracking-wider">
                                                Earnings
                                            </TableHead>
                                            <TableHead scope="col" className="text-center tracking-wider">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px] lg:text-[14px]">
                                        <TableRow className="text-white text-center text-[12px] lg:text-md">
                                            <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                                                {1}
                                            </TableCell>
                                            <TableCell className="py-2 whitespace-nowrap font-medium flex items-center justify-center">
                                                <Image
                                                    className="h-12 w-12 rounded-full"
                                                    width={20}
                                                    height={20}
                                                    loading="lazy"
                                                    src={`/${displayUser.planetName}.png`}
                                                    alt="Avatar"
                                                />
                                            </TableCell>
                                            <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                                                {displayUser.fromBNId}
                                            </TableCell>
                                            <TableCell className="py-2 whitespace-nowrap">
                                                {new Date(displayUser.time).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="py-2 whitespace-nowrap">
                                                {displayUser.planetName}
                                            </TableCell>
                                            <TableCell className="py-2 whitespace-nowrap">
                                                {String(displayUser.amount)}
                                            </TableCell>
                                            <TableCell className="py-2 whitespace-nowrap font-medium">
                                                <Button onClick={() => handleToggle(1)}>
                                                    {expanded[1] ? "Hide" : "Show"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-red-500 text-center font-semibold text-xl lg:text-3xl mt-2"></div>
                            )}
                        </div>

                        {directEarnings && directEarnings.users.length > 0 && (
                            <div className="w-3/4">
                                <Table className="divide-y divide-gray-600 rounded-lg">
                                    <TableHeader className="bg-stone-900">
                                        <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                            <TableHead scope="col" className="px-5 lg:px-0 py-5 text-center">
                                                Sr No
                                            </TableHead>
                                            <TableHead scope="col" className="px-5 lg:px-0 py-5 text-center">
                                                Planet
                                            </TableHead>

                                            <TableHead scope="col" className="py-3 text-center tracking-wider">
                                                Date & Time
                                            </TableHead>
                                            <TableHead scope="col" className="py-3 text-center tracking-wider">
                                                Planet
                                            </TableHead>
                                            <TableHead scope="col" className="text-center tracking-wider">
                                                Earnings
                                            </TableHead>
                                            <TableHead scope="col" className="text-center tracking-wider">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px] lg:text-[14px]">
                                        {directEarnings.users.map((user, index) => (
                                            <React.Fragment key={index}>
                                                <TableRow className="text-white text-center text-[12px] lg:text-md">
                                                    <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell className="py-2 whitespace-nowrap font-medium flex items-center justify-center">
                                                        <Image
                                                            className="h-12 w-12 rounded-full"
                                                            width={20}
                                                            height={20}
                                                            loading="lazy"
                                                            src={`/${user.planetName}.png`}
                                                            alt="Avatar"
                                                        />
                                                    </TableCell>

                                                    <TableCell className="py-2 whitespace-nowrap">
                                                        {new Date(user.time).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="py-2 whitespace-nowrap">
                                                        {user.planetName}
                                                    </TableCell>
                                                    <TableCell className="py-2 whitespace-nowrap">
                                                        {String(user.amount)}
                                                    </TableCell>
                                                    <TableCell className="py-2 whitespace-nowrap font-medium">
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
                                                                        believer_address: {user.reg_user_address}
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
                        )}

                        <div className="w-3/4 my-5 flex flex-col lg:flex-row items-center justify-between gap-y-4">
                            <div className="order-2 lg:order-1">
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={handlePreviousClick}
                                        disabled={currentItemIndex === 0}
                                        className="border-2 border-yellow-500 h-7 p-3 flex items-center rounded-md hover:bg-stone-700 duration-300"
                                    >
                                        &larr;
                                    </button>
                                    <div style={{ margin: "20px", textAlign: "center" }}>
                                        {currentItemIndex + 1} / {directEarnings?.totalPages ?? 0}
                                    </div>
                                    <button
                                        onClick={handleNextClick}
                                        disabled={currentItemIndex === (directEarnings?.totalPages ?? 0) - 1}
                                        className="border-2 border-yellow-500 h-7 p-3 flex items-center rounded-md hover:bg-stone-700 duration-300"
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
                                    <SelectTrigger className="w-[110px] text-[12px] h-7 lg:h-9 lg:w-[140px] lg:text-md border border-yellow-400">
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
