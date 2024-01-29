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

const Top10Rec = () => {
  return (
    <div>

    <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Top 10 Recrutier
        </p>
      </div>

      <div className="w-80  md:w-auto mx-5 rounded-md ">
        <Table className="">
          <TableHeader>
            <TableRow className="text-yellow-400 text-[10px] lg:text-lg  2xl:text-[15px] border-b border-b-zinc-600">
              <TableHead className="w-fit px-5">
                <div className="w-full flex items-center justify-center gap-x-2"><span>Rank No</span> <MdOutlineSortByAlpha /></div>
              </TableHead>
              <TableHead className="px-6 text-center">User Id</TableHead>
              <TableHead className="text-center px-6 ">Direct Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[10px]  lg:text-[14px]">
            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">1</TableCell>
              <TableCell>BN091287 </TableCell>
              <TableCell className="text-center px-2">94</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">2</TableCell>
              <TableCell>BN068287 </TableCell>
              <TableCell className="text-center px-2">87</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">3</TableCell>
              <TableCell>BN031287 </TableCell>
              <TableCell className="text-center px-2">84</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">4</TableCell>
              <TableCell>BN011287 </TableCell>
              <TableCell className="text-center px-2">74</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">5</TableCell>
              <TableCell>BN022287 </TableCell>
              <TableCell className="text-center px-2">72</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">6</TableCell>
              <TableCell>BN091466 </TableCell>
              <TableCell className="text-center px-2">68</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">7</TableCell>
              <TableCell>BN000027 </TableCell>
              <TableCell className="text-center px-2">64</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">8</TableCell>
              <TableCell>BN091287 </TableCell>
              <TableCell className="text-center px-2">94</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">9</TableCell>
              <TableCell>BN091287 </TableCell>
              <TableCell className="text-center px-2">94</TableCell>
            </TableRow>

            <TableRow className="border-b border-b-zinc-600">
              <TableCell className="font-medium">10</TableCell>
              <TableCell>BN091287 </TableCell>
              <TableCell className="text-center px-2">94</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Top10Rec;
