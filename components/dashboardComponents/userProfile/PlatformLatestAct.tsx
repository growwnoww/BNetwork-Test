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
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa";

const PlatformLatestAct = () => {
    return (
        <div>

            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
                    Platform Latest Activity
                </p>
            </div>

            <div className="w-auto  md:w-auto mx-5 rounded-md ">
                <Table className="">
                    <TableHeader>
                        <TableRow className="text-yellow-400 text-[10px] lg:text-[10px]  2xl:text-[15px] border-b border-b-zinc-600">
                            <TableHead className="w-fit px-5">
                                <div className="w-full flex items-center justify-center gap-x-2"><span>User Id</span> <MdOutlineSortByAlpha /></div>
                            </TableHead>
                            <TableHead className="px-6 text-center">Type</TableHead>
                            <TableHead className="px-6 text-center">Amount</TableHead>
                            <TableHead className="px-6 text-center">Address</TableHead>
                            <TableHead className="text-center px-6 ">Transaction Hash</TableHead>
                        </TableRow>
                    </TableHeader>

                <TableBody className="text-[10px]  lg:text-[10px] 2xl:text-[14px]">
                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>


                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>

                    <TableRow className="border-b border-b-zinc-600">
                        <TableCell>BN091287 </TableCell>
                        <TableCell className="text-center px-2">Direct Income</TableCell>
                        <TableCell className="text-center px-2">500</TableCell>
                        <TableCell className="text-center px-2">0x9f9...056ee</TableCell>
                        <TableCell className="text-center flex items-center justify-center gap-x-3">
                            <p>0x9ab...00d737f</p>
                            <FaRegCopy className="cursor-pointer" />
                            <HiArrowTopRightOnSquare className="cursor-pointer" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div >
  );
};

export default PlatformLatestAct;
