"use client"
import React, { useState } from "react";
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
import HeadingWrapper from "@/components/WrapperComponent/HeadingWrapper";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import { tableData } from "@/utils/DirectTeamData";

const Page = () => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (userId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // Function to determine the status color

  return (
    <div className="flex flex-col">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Tier Team
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
                <div>
                  <p>Levels</p>
                  <Select>
                    <SelectTrigger className="w-[70px] h-8 lg:w-[95px] lg:h-10  ">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="level_1">Level 1</SelectItem>
                      <SelectItem value="level_2">Level 2</SelectItem>
                      <SelectItem value="level_3">Level 3</SelectItem>
                      <SelectItem value="level_4">Level 4</SelectItem>
                      <SelectItem value="level_5">Level 5</SelectItem>
                      <SelectItem value="level_6">Level 6</SelectItem>
                      <SelectItem value="level_7">Level 7</SelectItem>
                      <SelectItem value="level_8">Level 8</SelectItem>
                      <SelectItem value="level_9">Level 9</SelectItem>
                      <SelectItem value="level_10">Level 10</SelectItem>
                      <SelectItem value="level_11">Level 11</SelectItem>
                      <SelectItem value="level_12">Level 12</SelectItem>
                      <SelectItem value="level_13">Level 13</SelectItem>
                      <SelectItem value="level_14">Level 14</SelectItem>
                      <SelectItem value="level_15">Level 15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-x-3 ">
                  <div>
                    <p>Packages</p>
                    <Select>
                      <SelectTrigger className="w-[90px] h-8 lg:w-[150px] lg:h-10">
                        <SelectValue placeholder="" className="text-[7px]" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Earth">Earth 5$</SelectItem>
                        <SelectItem value="Moon">Moon 10$</SelectItem>
                        <SelectItem value="Mars">Mars 25$</SelectItem>
                        <SelectItem value="Venus">Venus 50$</SelectItem>
                        <SelectItem value="Mercury">Mercury 100$</SelectItem>
                        <SelectItem value="Jupiter">Jupiter 250$</SelectItem>
                        <SelectItem value="Saturn">Saturn 500$</SelectItem>
                        <SelectItem value="Uranus">Uranus 1000$</SelectItem>
                        <SelectItem value="Neptune">Neptune 2500$</SelectItem>
                        <SelectItem value="Pluto">Pluto 5000$</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant={"custom_yellow"}
                    className="mt-6 h-7 md:h-10"
                  >
                    Submit
                  </Button>
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
                      Current Planet
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      BN Id
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Date & time
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Upline Id
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Status
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                  {tableData.map((user, index) => (
                    <React.Fragment key={user.id}>
                      <TableRow className="text-white text-center text-[12px] lg:text-md">
                        <TableCell className=" py-2 whitespace-nowrap  font-medium flex items-center justify-center">
                          <Image
                            className="h-12 w-12  rounded-full"
                            width={20}
                            height={20}
                            loading="lazy"
                            src={user.imgURL}
                            alt="Avatar"
                          />
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                          {user.BNId}
                        </TableCell>
                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.Date}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.uplineId}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap  ">
                          <div className="w-full flex items-center justify-center">
                            <p
                              className={`w-fit p-1 px-2 rounded-md ${
                                user.status === "Active"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {" "}
                              {user.status}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className=" py-2  whitespace-nowrap font-medium">
                          <Button onClick={() => handleToggle(user.id)}>
                            {expanded[user.id] ? "Hide" : "Show"}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expanded[user.id] && (
                        <TableRow className="text-white text-center">
                          {/* Notice the colSpan should be equal to the number of columns in the table */}
                          <TableCell
                            colSpan={8}
                            className="px-3 py-2 whitespace-nowrap text-sm"
                          >
                            <div className="w-full  flex flex-col    gap-x-5 gap-y-1  p-4 text-md">
                              <div className="flex gap-x-2">
                                <p className="w-fit ">
                                  Address: {user.address}
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

              <div className="order-1 lg:order-2 text-sm ">
                <p>Show Entries</p>
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
