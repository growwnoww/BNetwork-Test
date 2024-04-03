"use client";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { MdOutlineOfflineBolt } from "react-icons/md";
import { TbCoinBitcoin } from "react-icons/tb";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import USDTABI from "@/contract/USDTABI.json";

const CurrentBalanceComp = () => {
    const walletContext = useContext(WalletContext);
    const { address } = useWeb3ModalAccount();
    const [balance, setBalance] = useState<any>(0);
    const [usdtBal, setUsdtBal] = useState<any>(0);
    const [etBal, setETbal] = useState<any>(0);

    const USDT_Address = "0x55d398326f99059ff775485246999027b3197955";
    const EnergyToken_Address = "0xE9Fd094111F6A79b08737058B0BF736B41BAB619";

    const { walletProvider } = useWeb3ModalProvider();

    const USDTTokenSC = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            console.log(address);
            const usdtContract = new ethers.Contract(USDT_Address, USDTABI, signer);
            const balance = await usdtContract.balanceOf(address);
            const convert = ethers.utils.formatEther(balance);
            setUsdtBal(Number(convert).toFixed(2));
        } catch (error) {
            console.log("Error in creating USDT contract", error);
        }
    };

    const EToken = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            console.log(address);
            const usdtContract = new ethers.Contract(EnergyToken_Address, USDTABI, signer);
            const balance = await usdtContract.balanceOf(address);
            const convert = ethers.utils.formatEther(balance);
            setETbal(Number(convert).toFixed(2));
        } catch (error) {
            console.log("Error in creating USDT contract", error);
        }
    };

    const getUserBalance = async () => {
        if (address) {
            const network = "https://data-seed-prebsc-1-s1.binance.org:8545/";
            const provider = new ethers.providers.JsonRpcProvider(network);
            const result = await provider.getBalance(address);
            const balanceInEth = ethers.utils.formatEther(result);
            const formattedBalance = parseFloat(balanceInEth).toFixed(4);
            setBalance(formattedBalance); // Update this line
        }
    };

    useEffect(() => {
        getUserBalance();
        USDTTokenSC();
        EToken();
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
