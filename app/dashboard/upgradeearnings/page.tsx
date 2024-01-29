import React from "react";
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

const page = () => {
  return (
    <div className="w-full h-full  flex flex-col items-center gap-y-10">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
        Upgrade Earnings
        </p>
      </div>

      <div className="flex items-center justify-around w-full py-5">
        <div>
          <p>Show Entries</p>
          <Select>
            <SelectTrigger className="w-[120px] lg:w-[180px] border border-yellow-400">
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

        <div>
          <p>Search ID</p>
          <Input placeholder="Enter BN ID" className="w-[120px] lg:w-[180px]" />
        </div>
      </div>

      <div className="w-96  md:w-auto mx-5 rounded-md">
        <Table className="">
          <TableHeader>
            <TableRow className="text-yellow-400 text-[10px] lg:text-lg 2xl:text-xl">
              <TableHead className="w-[100px] px-3 ">BN ID</TableHead>
              <TableHead className="text-center ">Date and Time</TableHead>
              <TableHead className="text-center px-3 lg:px-0">
                Income From Tier
              </TableHead>
              <TableHead className="text-center ">Planet Package</TableHead>
              <TableHead className="text-center ">Earnings</TableHead>
              <TableHead className="text-center ">Transaction Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[10px]  lg:text-[14px]">
            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center px-5">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center px-2">2.500</TableCell>
              <TableCell className="text-center ">Earth 5$ </TableCell>
              <TableCell className="text-center ">5.00</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>


     
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex items-center justify-evenly">
        <div>
          <p>Show 1 to 10 of 5,076 Entries</p>
        </div>
        <div>
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
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default page;
