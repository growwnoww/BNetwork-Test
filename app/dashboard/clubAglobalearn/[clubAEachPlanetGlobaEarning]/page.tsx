'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ClubAGlobalTableData } from '@/utils/ClubAGlobalTableData'
import { clubAContract } from '@/contract/ClubAContract/ClubA_Instance'
import { ethers } from 'ethers'
import { FaRegCopy } from 'react-icons/fa'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectEntries } from '@/utils/SelectEntries'

interface GlobalDatatypeMore {
  leftUser: string;
  rightUser: string;
  recycleBy: string;
}

interface GlobalDatatype {
  srno: number;
  planetBuyNo: number;
  user: string;
  recycleStatus: boolean
  more: GlobalDatatypeMore;
}

const Page = () => {
  const [globalData, setGlobalData] = useState<any>([])
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [values, setValues] = useState({
    entries: "10",
  });

  const handleSelectEntriesChange = (selectEntries: string) => {
    setValues((prevState: any) => ({
      ...prevState,
      entries: selectEntries,
    }));
  };



  const handleToggle = (userId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const getRecycleStatus = (recyclebyAdd:number) =>{
    if(recyclebyAdd === 0){
      return "Incomplete"
    }
    return "Complete"
  }

  const getGlobalEarningData = async () => {
    try {
      const clubACont = clubAContract();
      const requests = Array.from({ length: Number(values.entries) }, (_, planetId) =>
        clubACont!.Walletdetails(1, planetId + 1)
      );

      const responses = await Promise.all(requests);


      const formattedData = responses.map((walletDetails,planetId )=> ({
        user: String(walletDetails.user).toString(),
        upline: String(walletDetails.upline).toString(),
        leftNo: ethers.BigNumber.from(walletDetails.left).toNumber(),
        rightNo: ethers.BigNumber.from(walletDetails.right).toNumber(),
        recycleby:ethers.BigNumber.from(walletDetails.recycleby).toNumber(),
        leftAdd: String(walletDetails.leftadd).toString(),
        rightAdd: String(walletDetails.rightadd).toString(),
        recyclebyAdd: String(walletDetails.recyclebyadd).toString(),
        planetId: planetId+1
      }));
      console.log("formattedData",formattedData)

      setGlobalData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGlobalEarningData();
  }, [values]);

  return (
    <div className="flex flex-col">
      <div className="w-full my-5 flex items-center justify-center">
        <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">
          Club A Global Earnings
        </p>
      </div>

    <div className='flex flex-col w-full'>
 
      <div className="">
        <div className="py-2 align-middle sm:px-6 lg:px-8 ">
          <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
          <div className="text-sm  ">
                <p>Show Entries</p>
                <Select
                  name="selectEntries"
                  value={values.entries}
                  onValueChange={handleSelectEntriesChange}
                >
                  <SelectTrigger className="w-[110px] text-[12px] h-7 lg:h-9 lg:w-[140px]  lg:text-md border border-yellow-400">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent defaultValue="Earth">
                    {SelectEntries.map((item: any) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.data}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            <div className="w-3/4">
              <Table className=" divide-y divide-gray-600 rounded-lg">
                <TableHeader className="bg-stone-900  ">
                  <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                    <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                      Sr No
                    </TableHead>
                    <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                      PlanetBuy No.
                    </TableHead>
                    <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                      User
                    </TableHead>
                    <TableHead scope="col" className=" text-center tracking-wider">
                      Recycle Status
                    </TableHead>
                    <TableHead scope="col" className=" text-center tracking-wider">
                      More
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-zinc-800 divide-y divide-gray-600 text-[10px]  lg:text-[14px]">
                  {globalData.map((user:any, index:any) => (
                    <React.Fragment key={index}>
                      <TableRow className="text-white text-center text-[12px] lg:text-md">
                        <TableCell className=" py-2  whitespace-nowrap text-[10px] lg:text-sm font-medium ">
                          {index+1}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap ">
                          {user.planetId}
                        </TableCell>
                        <TableCell className=" py-2  whitespace-nowrap ">
                        {user.user.slice(0, 6)}...{user.user.slice(-8)}
                        </TableCell>

                        <TableCell className=" py-2  whitespace-nowrap  ">
                          <div className="w-full flex items-center justify-center">
                            <p
                              className={`w-fit p-1 px-2 rounded-md ${
                                getRecycleStatus(user.recycleby) === "Complete"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {" "}
                              {getRecycleStatus(user.recycleby)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className=" py-2  whitespace-nowrap font-medium">
                              <Button onClick={() => handleToggle(user.planetId)}>
                                {expanded[user.planetId] ? "Hide" : "Show"}
                              </Button>
                            </TableCell>
                      </TableRow>
                      {expanded[user.planetId] && (
                            <tr className="text-white text-center">
                              {/* Notice the colSpan should be equal to the number of columns in the table */}
                              <td
                                colSpan={8}
                                className="px-3 py-2 whitespace-nowrap text-sm"
                              >
                                <div className="w-full  flex flex-col    gap-x-5 gap-y-1  p-4 text-md">
                                  <div className="flex gap-x-2">
                                    <p className="w-fit ">
                                      1st 80% Earned From: {user.leftAdd.slice(0, 6)}...{user.leftAdd.slice(-8)}
                                    </p>
                                    <div className="flex items-center gap-x-2 ">
                                      <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                    </div>
                                  </div>
                                  <div className="flex gap-x-2">
                                    <p className="w-fit ">
                                    2nd 80% Earned From: {user.rightAdd.slice(0, 6)}...{user.rightAdd.slice(-8)}
                                    </p>
                                     <div className="flex items-center gap-x-2 ">
                                      <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
                                      </div>
                                  </div>
                                  <div className="flex gap-x-2">
                                    <p className="w-fit ">
                                      Recycle By  User Address: {user.recyclebyAdd.slice(0, 6)}...{user.recyclebyAdd.slice(-8)}
                                    </p>
                                    <div className="flex items-center gap-x-2 ">
                                      <FaRegCopy className="cursor-pointer hover:bg-slate-600 p-1 rounded-full text-2xl" />
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
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
