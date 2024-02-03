"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { TbCoinBitcoin } from "react-icons/tb";
import { Context } from "../Context";
import { bNetwork, signer } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { useBalance } from "wagmi";
import { MdOutlineOfflineBolt } from "react-icons/md";
import TokenABI from "@/contract/Token_ABI.json";

const CurrentBalanceComp = () => {
    const { userAddress, userBalance, setUserBalance } = useContext(Context);
    const [etTokenBalance, setEtTokenBalance] = useState<string>("");
    const [usdtTokenBalance, setUsdtTokenBalance] = useState<string>("");

    const result = useBalance({
        address: userAddress,
    });

    setUserBalance(result?.data?.formatted);

    const etBalance = async () => {
        try {
            const myContract = bNetwork();
            const getAdd = await myContract.getEnergyToken();

            const instance = new ethers.Contract(getAdd, TokenABI, signer);
            const balance = await instance.balanceOf(userAddress);
            const balanceInET = ethers.utils.formatEther(balance);
            setEtTokenBalance(balanceInET);
        } catch (error) {
            console.log(error);
        }
    };

    const usdtBalance = async () => {
        try {
            const myContract = bNetwork();
            const getAdd = await myContract.getFeeToken();

            const instance = new ethers.Contract(getAdd, TokenABI, signer);
            const balance = await instance.balanceOf(userAddress);
            const balanceInUSDT = ethers.utils.formatEther(balance);
            setUsdtTokenBalance(balanceInUSDT);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        etBalance();
        usdtBalance();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="flex justify-between px-4 gapx-5 text-sm lg:text-lg">
                <div className="flex items-center  lg:text-md gap-x-1">
                    <span className="inline-block text-2xl ">
                        <AiTwotoneDollarCircle className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span className="">{userAddress ? Number(usdtTokenBalance).toFixed(2) : "0"}</span>
                    <span className="text-yellow-400">USDT</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <TbCoinBitcoin className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{userAddress ? Number(userBalance).toFixed(2) : "0"} BNB </span>
                    <span className="text-yellow-400">(BEP20)</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <MdOutlineOfflineBolt className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{userAddress ? Number(etTokenBalance).toFixed(2) : "0"}</span>
                    <span className="text-yellow-400">ET </span>
                </div>
            </div>
        </>
    );
};

export default CurrentBalanceComp;
