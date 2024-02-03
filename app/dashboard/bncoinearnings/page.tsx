'use client'
import React, { useState } from "react";
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
import { MdOutlineSortByAlpha } from "react-icons/md";
import { tableData } from "@/utils/DirectTeamData";
import { Button } from "@/components/ui/button";

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
             BN Coin Earned
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
                className="w-[140px] h-8"
              />
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
                      Form Id
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
                      Earned
                    </TableHead>
                    

                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Earing Through
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
                  {tableData.map((user, index) => (
                    <React.Fragment key={user.id}>
                      <TableRow className="text-white text-center text-[12px] lg:text-md">

                      <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                          {user.id}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                          {user.BNId}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.Date}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.incomeFromTier}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.earningThrough}
                        </TableCell>


                        <TableCell className=" py-2  whitespace-nowrap font-medium">
                          <Button onClick={() => handleToggle(user.id)}>
                            {expanded[user.id] ? "Hide" : "Show"}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expanded[user.id] && (
                      <tr className="text-white text-center">
                        {/* Notice the colSpan should be equal to the number of columns in the table */}
                        <td
                          colSpan={8}
                          className="px-3 py-2 whitespace-nowrap text-sm"
                        >
                          <div className="w-full  flex flex-col    gap-x-5 gap-y-1  p-4 text-md">
                            <div className="flex gap-x-2">
                              <p className="w-fit ">Transaction Hash: {user.address}</p>
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
}

export default Page;
