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
    const[usdtBal,setUsdtBal] = useState<any>(0)
    const [etBal,setETbal] = useState<any>(0);

    const loadBalance = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const balance = await provider.getBalance(address);
                const formattedBalance = parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
                // const trimBalance  = 
                setBalance(formattedBalance);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            alert('Ethereum wallet is not connected. Please install MetaMask!');
        }
    };


    const getUserUSDTBalance = async () => {
        const usdtContract = usdtTokenSC()
        const usdtBalanceRaw = await usdtContract!.balanceOf(address);
        console.log("Raw USDT balance:", usdtBalanceRaw.toString());

    
        if (address && isConnected) {
            const formattedBalance = ethers.utils.formatUnits(usdtBalanceRaw);
            const displayBalance = parseFloat(formattedBalance).toFixed(2);

            setUsdtBal(displayBalance);
        }
    };
    
    

    const getUserETBalance = async () =>{
        const ETContract = etTokenSC()

        if(address && isConnected){
           
            const etBalance = await ETContract!.balanceOf(address);
           

            const formattedBalance = ethers.utils.formatUnits(etBalance);
            const displayBalance = parseFloat(formattedBalance).toFixed(2);
  
            setETbal(displayBalance)
        }
    };


   

    useEffect(() => {
       
        getUserUSDTBalance();
        getUserETBalance()
        loadBalance()
      
    }, [address,isConnected]);



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
                    <span  className="text-yellow-400 text-xs md:text-sm lg:text-lg"> BNB </span>
                  
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
