'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { Input } from "@/components/ui/input"
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import { tableData } from '@/utils/DirectTeamData'
import { Button } from '@/components/ui/button'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { FaRegCopy } from 'react-icons/fa'
import Link from 'next/link'


const Page = () => {


  // Function to determine the status color

  return (
    <div className="flex flex-col">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Club A Global Earnings
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
            </div>

            <div className="w-3/4">
              <Table className=" divide-y divide-gray-600 rounded-lg">
                <TableHeader className="bg-stone-900  ">
                  <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                    <TableHead
                      scope="col"
                      className=" px-5 lg:px-0 py-5 text-center "
                    >
                     Planet
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" px-5 lg:px-0 py-5 text-center "
                    >
                      Planet Name
                    </TableHead>
           

                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Date & Time
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Amount
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      Total Planet
                    </TableHead>
                     
                    <TableHead
                      scope="col"
                      className=" text-center tracking-wider"
                    >
                      More
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


                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.Date}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.incomeFromTier}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.incomeFromTier}
                        </TableCell>

                         <TableCell className="px-3 lg:px-0 py-2 w whitespace-nowrap font-medium">
                            <Link href=''>
                              <Button   >
                                View Detail
                              </Button>
                             </Link>
                        </TableCell>
                      </TableRow>
                   
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
};


export default Page