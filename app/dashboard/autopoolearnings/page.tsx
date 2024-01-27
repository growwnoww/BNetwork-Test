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
import HeadingWrapper from "@/components/WrapperComponent/HeadingWrapper";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineSortByAlpha } from "react-icons/md";

const page = () => {
  return (
    <div className="w-full h-full  flex flex-col items-center ">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Auto Pool Earnings
        </p>
      </div>

      <div className="flex items-center justify-around py-5  w-full">
        <div>
          <p>Levels</p>
          <Select>
            <SelectTrigger className="w-[120px] lg:w-[180px] border border-yellow-400">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="level_1">Level 1</SelectItem>
              <SelectItem value="level_2">Level 2</SelectItem>
              <SelectItem value="level_3">Level 3</SelectItem>
              <SelectItem value="level_4">Level 4</SelectItem>
              <SelectItem value="level_5">Level 5</SelectItem>         
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-x-3 ">
          <div>
            <p>Packages</p>
            <Select>
              <SelectTrigger className="w-[120px] lg:w-[180px] text-[10px] border border-yellow-400">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className=""> 
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

          <Button variant={"custom_yellow"} className="mt-6">
            Submit
          </Button>
        </div>
      </div>

      <div className="w-96  md:w-auto mx-5 rounded-md">
        <Table className="">
          <TableHeader>
            <TableRow className="text-yellow-400 text-[10px] lg:text-md 2xl:text-[18px]">
            <TableHead className=" w-auto px-4"><div className="flex items-center justify-center gap-x-1"><span>Sr No</span> <MdOutlineSortByAlpha /></div></TableHead>
            <TableHead className="px-3  w-auto"><div className="flex items-center justify-center gap-x-1"><span>Tier No</span> <MdOutlineSortByAlpha /></div></TableHead>
              <TableHead className="text-center">Date and Time</TableHead>
              <TableHead className="text-center">From ID </TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center px-2">On Package</TableHead>
              <TableHead className="text-center ">Transaction Hash</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[8px]  lg:text-[12px]">
            <TableRow className="">
            <TableCell className="font-medium">1</TableCell>
              <TableCell className="font-medium">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center">BN091287</TableCell>
              <TableCell className="text-center">1000</TableCell>
              <TableCell className="text-center">10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>
             
            <TableRow className="">
              <TableCell >2</TableCell>
              <TableCell >3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="">
            <TableCell className="font-medium">3</TableCell>
              <TableCell className="font-medium">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="text-center">BN091287</TableCell>
              <TableCell className="text-center">1000</TableCell>
              <TableCell className="text-center">10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">3</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">4</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">5</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">6</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">7</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">8</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">9</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

            <TableRow className="text-center font-medium">
            <TableCell className="">10</TableCell>
              <TableCell className="">3</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell >BN091287</TableCell>
              <TableCell >1000</TableCell>
              <TableCell >10.0</TableCell>
              <TableCell className="text-center flex items-center justify-center gap-x-3">
                <p>0x9ab...00d737f</p>
                <FaRegCopy className="cursor-pointer" />
                <HiArrowTopRightOnSquare className="cursor-pointer" />
              </TableCell>
            </TableRow>

           
          </TableBody>
        </Table>
      </div>

      <div className="w-full flex items-center justify-evenly mt-5">
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

