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
import { MdOutlineSortByAlpha } from "react-icons/md";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">

    <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
         Live Planet Status
        </p>
      </div>

      <div className="w-80  md:w-3/4  mx-5 rounded-md ">
        <Table className="">
          <TableHeader>
            <TableRow className="text-yellow-400 text-[10px] lg:text-lg  2xl:text-[15px] border-b border-b-zinc-600">
              <TableHead className="w-fit px-1">
                <div className="w-full flex items-center justify-center gap-x-2"><span>Planet No</span> <MdOutlineSortByAlpha /></div>
              </TableHead>
              <TableHead className="px-1 text-center">Planet Name</TableHead>
              <TableHead className="text-center px-1 ">Amount</TableHead>
              <TableHead className="text-center px-1 ">Total Planet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[10px]  lg:text-[14px]">
            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth </TableCell>
              <TableCell className="text-center px-2">5$</TableCell>
              <TableCell className="text-center px-2">500</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
