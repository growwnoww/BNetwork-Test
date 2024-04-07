"use client";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { MdOutlineOfflineBolt } from "react-icons/md";
import { TbCoinBitcoin } from "react-icons/tb";

const CurrentBalanceComp = () => {
    const walletContext = useContext(WalletContext);
    console.log(walletContext?.userAddress);
    const [balance, setBalance] = useState<any>(0);
    const [usdtBal, setUsdtBal] = useState<any>(0);
    const [etBal, setETbal] = useState<any>(0);

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

    useEffect(() => {
        getUserBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex justify-between px-4 gap-x-5 text-sm lg:text-lg">
                <div className="flex items-center  lg:text-md gap-x-1">
                    <span className="inline-block text-2xl ">
                        <AiTwotoneDollarCircle className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span className="">{usdtBal}</span>
                    <span className="text-yellow-400 text-xs md:text-sm lg:text-lg">USDT</span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <TbCoinBitcoin className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{balance}</span>
                    <span className="text-yellow-400"> BNB </span>
                </div>
                <div className="flex items-center gap-x-1">
                    <span className="inline-block text-2xl ">
                        <MdOutlineOfflineBolt className="text-sm text-yellow-500 lg:text-lg xl:text-lg" />
                    </span>
                    <span>{etBal}</span>
                    <span className="text-yellow-400 text-xs md:text-sm lg:text-lg">BNS E.T </span>
                </div>
            </div>
        </>
    );
};

export default CurrentBalanceComp;
