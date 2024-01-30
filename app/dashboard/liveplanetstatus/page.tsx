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
          Planet Upgrade History
        </p>
      </div>

      <div className="">
        <div className="py-2 align-middle sm:px-6 lg:px-8 ">
          <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
      

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
                      Planet No
                    </TableHead>
                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
                    >
                      Planet Name
                    </TableHead>

                    <TableHead
                      scope="col"
                      className=" py-3 text-center tracking-wider"
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
                      className=" text-center r"
                    >
                      Just bought Planet
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

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.id}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.planetName}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.incomeFromTier}
                        </TableCell>
                        
                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.incomeFromTier}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.incomeFromTier}
                        </TableCell>
                      </TableRow>
                  
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


export default Page