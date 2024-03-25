"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { tableData } from "@/utils/DirectTeamData";
import { ethers } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import BNetworkABI from "@/contract/BNetwork_ABI.json";

const Page = () => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [planetFee, setPlanetFee] = useState<any>([]);
    const { walletProvider } = useWeb3ModalProvider();
    const B_Network_Address = "0x5ea64Ab084722Fa8092969ED45642706978631BD";

    const handleToggle = (userId: number) => {
        setExpanded((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const userPlanet = async () => {
        const resultsArray: { plannetDetails: any }[] = [];
        try {
            for (let i = 1; i <= 10; i++) {
                // const myContract = BNetwork();
                const provider = new ethers.providers.Web3Provider(walletProvider as any);
                const signer = provider.getSigner();
                const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

                const plannetDetails = await BNetworkContract.MatrixDetails(i);
                resultsArray.push({ plannetDetails });
                setPlanetFee(resultsArray);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to determine the status color

    useEffect(() => {
        userPlanet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col">
            <div className="w-full my-5 flex items-center justify-center">
                <p className="border-b-2 border-b-yellow-400 w-fit text-2xl lg:text-4xl">Live Planet Status</p>
            </div>

            <div className="">
                <div className="py-2 align-middle sm:px-6 lg:px-8 ">
                    <div className="flex flex-col items-center justify-center gap-y-6   sm:rounded-lg ">
                        <div className="w-3/4">
                            <Table className=" divide-y divide-gray-600 rounded-lg">
                                <TableHeader className="bg-stone-900  ">
                                    <TableRow className="text-yellow-400 text-[10px] lg:text-[13px] uppercase text-center">
                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Planet
                                        </TableHead>

                                        <TableHead scope="col" className=" px-5 lg:px-0 py-5 text-center ">
                                            Planet No
                                        </TableHead>
                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Planet Name
                                        </TableHead>

                                        <TableHead scope="col" className=" py-3 text-center tracking-wider">
                                            Amount
                                        </TableHead>

                                        <TableHead scope="col" className=" text-center tracking-wider">
                                            Total Planet
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

                                                <TableCell className=" py-2  whitespace-nowrap ">{user.id}</TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {user.planetName}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {planetFee[index]
                                                        ? Number(
                                                              ethers.utils.formatEther(
                                                                  planetFee[index].plannetDetails.fee._hex
                                                              )
                                                          )
                                                              .toFixed(0)
                                                              .toString()
                                                        : "Loading..."}
                                                </TableCell>

                                                <TableCell className=" py-2  whitespace-nowrap ">
                                                    {planetFee[index]
                                                        ? Number(
                                                              planetFee[index].plannetDetails.universalslot._hex
                                                          ).toString()
                                                        : "Loading..."}
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

export default Page;
