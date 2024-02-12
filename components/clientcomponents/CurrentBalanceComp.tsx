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
import { WalletContext } from "@/context/WalletContext";

const CurrentBalanceComp = () => {
    
    const walletContext = useContext(WalletContext);
    console.log(walletContext?.userAddress)
    const [balance,setBalance] = useState<any>(0)

   const getUserBalance = async() =>{
    const network = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
    const provider = new ethers.providers.JsonRpcProvider(network);
    if(walletContext?.userAddress){
        const result = await provider.getBalance(walletContext.userAddress);
        const balanceInEth = ethers.utils.formatEther(result)
        console.log(`balance: ${balanceInEth} ETH`)
        const formattedBalance = parseFloat(balanceInEth).toFixed(4);
        setBalance(formattedBalance); // Update this line
    }
   }

  useEffect(()=>{
    getUserBalance();
  },[])
   
    // const usdtBalance = async () => {
    //     try {
    //         const myContract = bNetwork();
    //         const getAdd = await myContract!.getFeeToken();

    //         const instance = new ethers.Contract(getAdd, TokenABI, signer);
    //         const balance = await instance.balanceOf(walleContext?.userAddress);
    //         const balanceInUSDT = ethers.utils.formatEther(balance);
    //         setUsdtTokenBalance(balanceInUSDT);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    return (
        <>
            <div className="flex justify-between px-4 gapx-5 text-sm lg:text-lg">
                <div className="flex items-center  lg:text-md gap-x-1">
                    <span className="inline-block text-2xl ">
                        <AiTwotoneDollarCircle className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span className="">0</span>
                    <span className="text-yellow-400">USDT</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <TbCoinBitcoin className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{balance} BNB </span>
                    <span className="text-yellow-400">(BEP20)</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <MdOutlineOfflineBolt className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>0</span>
                    <span className="text-yellow-400">ET </span>
                </div>
            </div>
        </>
    );
};

export default CurrentBalanceComp;
