"use client";
import React, { useContext, useEffect } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { TbCoinBitcoin } from "react-icons/tb";
import { Context } from "../Context";
import { bNetwork } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { useBalance } from "wagmi";
import { MdOutlineOfflineBolt } from "react-icons/md";

const CurrentBalanceComp = () => {
    const { userAddress, userBalance, setUserBalance } = useContext(Context);

    const result = useBalance({
        address: userAddress,
    });

    setUserBalance(result?.data?.formatted);

    const getBalance = async (address: string) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            const balanceInEth = ethers.utils.formatEther(balance);
            console.log({ balanceInEth });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // getBalance(address);
        // bnbBalance();
    }, []);

    return (
        <>
            <div className="flex justify-between px-4 gapx-5 text-sm lg:text-lg">
                <div className="flex items-center  lg:text-md gap-x-1">
                    <span className="inline-block text-2xl ">
                        <AiTwotoneDollarCircle className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span className="">5.456 </span>
                    <span className="text-yellow-400">USDT</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <TbCoinBitcoin className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{Number(userBalance).toFixed(2)} BNB </span>
                    <span className="text-yellow-400">(BEP20)</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <MdOutlineOfflineBolt className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>10 ET </span>
                    <span className="text-yellow-400">ET </span>
                </div>
            </div>
        </>
    );
};

export default CurrentBalanceComp;
