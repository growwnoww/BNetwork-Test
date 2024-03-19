"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
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
import HeadingWrapper from "@/components/WrapperComponent/HeadingWrapper";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { tableData } from "@/utils/DirectTeamData";
import { SelectData } from "@/utils/SelectData";
import { SelectLevel } from "@/utils/SelectLevel";
import { useConfig } from "wagmi";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";

interface valueType {
  recycleVal: string;
  level: string;
  package: string;
}

interface RecycleItem {
  currentLevel: number;
  currentPosition: number;
  bn_id: string;
  amount: number;
  reg_user_address: string;
  timestamp: string;
}

interface AutoPoolTableData {
  data: RecycleItem[];
}

const Page = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [autoPoolTableData, setAutoPoolTableData] = useState<AutoPoolTableData>(
    { data: [] }
  );
  const [value, setValue] = useState<valueType>({
    recycleVal: "1",
    level: "1",
    package: "Earth",
  });
  const [emptyLevelMessage, setEmptyLevelMessage] = useState("");
  const [recycleMax,setMaxRecycle] = useState<number>(0)

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

  const getPlanetName = (planetId: string): string => {
    const planetNames: { [id: string]: string } = {
      Earth: "5$",
      Moon: "10$",
      Mars: "25$",
      Mercury: "50$",
      Venus: "100$",
      Jupiter: "250$",
      Saturn: "500$",
      Uranus: "1000$",
      Neptune: "2500$",
      Pluto: "5000$",
    };

    return planetNames[planetId];
  };

  const getAutoPoolData = async () => {
    try {
      const query = `${
        process.env.NEXT_PUBLIC_URL
      }/user/getAutoPoolTable/${userAddress?.toLowerCase()}/${value?.package}/${
        value?.recycleVal
      }/${value?.level}`;
      console.log("query", query);
      const response = await fetch(query);

      if (response.ok) {
        const data: AutoPoolTableData = await response.json();
        console.log(data)
        setAutoPoolTableData(data);
        if (data.data.length === 0) {
          setEmptyLevelMessage("No data available for this level.");
        } else {
          setEmptyLevelMessage(""); // Clear message if there is data
        }
      } else {
        console.log("Failed to fetch auto pool table data");
      }
    } catch (error) {
      console.error("Error fetching auto pool table data:", error);
    }
  };

  const getRecycleLevel = async() =>{
    try {
      const response = await axios(`${process.env.NEXT_PUBLIC_URL}/user/getRecycleMaxLevel/${userAddress?.toLowerCase()}/${value.package}`)

      if(response.data){
        const data = await response.data;
 
         setMaxRecycle(data)
      }
    } catch (error) {
      setMaxRecycle(0)
    }
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log("data", value);
    await getAutoPoolData();
  };

  useEffect(() => {
    getAutoPoolData();
    getRecycleLevel()
  }, []);

  // useEffect(() => {
  //   getAutoPoolData();
  // }, [value.package, value.recycleVal, value.level, userAddress]); // Dependency array ensures updates

  // Function to determine the status color

  return (
    <div className="flex flex-col">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Auto Pool Earnings
        </p>
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
                  className="w-full flex items-center flex-row justify-end gap-x-3 "
                >
                  <div className="flex items-center gap-x-3 ">
                    <div>
                      <p>Packages</p>
                      <Select
                        name="selectedPackage"
                        value={value.package}
                        onValueChange={handleSelectPackageChange}
                      >
                        <SelectTrigger className="w-[110px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
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
                    <p>Recycle </p>
                    <Input
                      type="number"
                      min="1"
                      max={recycleMax}
                      
                      defaultValue="1"
                      placeholder="Enter Recycle Number"
                      className="w-[50px] h-7 lg:h-9 lg:w-[70px]"
                      name="recycleVal"
                      value={value.recycleVal}
                      onChange={(e) => {
                        // Parse the value as integer and ensure it's not greater than recycleMax
                        const newValue = Math.min(parseInt(e.target.value, 10), recycleMax);
                        // Update the state, ensuring it's never set higher than recycleMax
                        setValue({ ...value, recycleVal: newValue.toString() });
                      }}
                    />
                  </div>

                  <div>
                    <p>Levels</p>
                    <Select
                      name="selectedLevel"
                      value={value.level}
                      onValueChange={handleSelectLevelChange}
                    >
                      <SelectTrigger className="w-[50px] h-8 lg:w-[75px] lg:h-9  ">
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

                  <Button
                    type="submit"
                    variant={"custom_yellow"}
                    className="mt-6 h-7 md:h-9"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>

            <div className="w-3/4">
           {
            autoPoolTableData && autoPoolTableData.data && autoPoolTableData.data.length > 0 ?
            (
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
                    Tier No
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
                    From BN Id
                  </TableHead>

                  <TableHead
                    scope="col"
                    className=" text-center tracking-wider"
                  >
                    Earned
                  </TableHead>

                  <TableHead
                    scope="col"
                    className=" text-center tracking-wider"
                  >
                    Planet Package
                  </TableHead>

                  <TableHead
                    scope="col"
                    className=" text-center tracking-wider"
                  >
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px] lg:text-[14px]">
                {autoPoolTableData && autoPoolTableData.data.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="text-white text-center text-[12px] lg:text-md">
                      <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                        {index + 1} {/* Displaying index as Sr No */}
                      </TableCell>

                      <TableCell className="py-2 whitespace-nowrap text-[10px] lg:text-sm font-medium">
                        {item.currentLevel}
                      </TableCell>

                      <TableCell className="py-2 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleString()}{" "}
                        {/* Formatting timestamp */}
                      </TableCell>

                      <TableCell className="py-2 whitespace-nowrap">
                        {item.bn_id}
                      </TableCell>

                      <TableCell className="py-2 whitespace-nowrap">
                        {item.amount.toFixed(2)}{" "}
                        {/* Assuming amount is a number */}
                      </TableCell>

                      <TableCell className="py-2 whitespace-nowrap">
                        {getPlanetName(value.package)}{" "}
                        {/* Assuming you want to display the user address */}
                      </TableCell>

                      <TableCell className="py-2 whitespace-nowrap font-medium">
                        <Button onClick={() => handleToggle(item.bn_id)}>
                          {expanded[item.bn_id] ? "Hide" : "Show"}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expanded[item.bn_id] && (
                      <tr className="text-white text-center">
                        <td
                          colSpan={7}
                          className="px-3 py-2 whitespace-nowrap text-sm"
                        >
                          <div className="w-full flex flex-col gap-x-5 gap-y-1 p-4 text-md">
                            {/* Display additional info here if needed, currently it's set to show user's BN ID*/}
                            <div className="flex gap-x-2">
                              <p className="w-fit">
                                User address: {item.reg_user_address}
                              </p>

                              {/* You can add more details from item here */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            ):
            
              <div className="text-red-500 text-center mt-2">
                No one present at this position.
              </div>

           }


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
