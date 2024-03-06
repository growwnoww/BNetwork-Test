"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { TbCoinBitcoin } from "react-icons/tb";
import { Context } from "../Context";
import { bNetwork, etTokenSC, usdtTokenSC } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { useAccount, useBalance } from "wagmi";
import { MdOutlineOfflineBolt } from "react-icons/md";
import TokenABI from "@/contract/Token_ABI.json";
import { WalletContext } from "@/context/WalletContext";


const CurrentBalanceComp = () => {
    const walletContext = useContext(WalletContext);
    console.log(walletContext?.userAddress);
    const {address,isConnected} = useAccount();
    const [balance, setBalance] = useState<any>(0);
    const[usdtBal,setUsdtBal] = useState<number>(0)
    const [etBal,setETbal] = useState<number>(0);


    const getUserBalance = async () => {
        if (walletContext?.userAddress) {
            const network = "https://data-seed-prebsc-1-s1.binance.org:8545/";
            const provider = new ethers.providers.JsonRpcProvider(network);
            const result = await provider.getBalance(walletContext.userAddress);
            const balanceInEth = ethers.utils.formatEther(result);
            console.log(`balance: ${balanceInEth} ETH`);
            const formattedBalance = parseFloat(balanceInEth).toFixed(4);
            setBalance(formattedBalance); // Update this line
        }
    };

    const getUserUSDTBalance = async () =>{
        const usdtContract = usdtTokenSC()

        if(address && isConnected){
            
            const usdtBalance = await usdtContract!.balanceOf(address);
            const decimals = await usdtContract!.decimals();

            const formattedBalance = ethers.utils.formatUnits(usdtBalance,decimals);
            console.log("Usdt balance",formattedBalance)
            setUsdtBal(Number(formattedBalance))
        }
    }

    const getUserETBalance = async () =>{
        const ETContract = etTokenSC()

        if(address && isConnected){
           
            const etBalance = await ETContract!.balanceOf(address);
            const decimals = await ETContract!.decimals();

            const formattedBalance = ethers.utils.formatUnits(etBalance,decimals);
            console.log("Energy token balance",formattedBalance)
            setETbal(Number(formattedBalance))
        }
    }


   

    useEffect(() => {
        getUserBalance();
        getUserUSDTBalance();
        getUserETBalance()
      
    }, [address,isConnected]);



    return (
        <>
            <div className="flex justify-between px-4 gap-x-5 text-sm lg:text-lg">
                <div className="flex items-center  lg:text-md gap-x-1">
                    <span className="inline-block text-2xl ">
                        <AiTwotoneDollarCircle className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span className="">{usdtBal}</span>
                    <span className="text-yellow-400">USDT</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <TbCoinBitcoin className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{balance}</span>
                    <span  className="text-yellow-400"> BNB </span>
                  
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <MdOutlineOfflineBolt className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{etBal}</span>
                    <span className="text-yellow-400">ET </span>
                </div>
            </div>
        </>
    );
};

export default CurrentBalanceComp;
