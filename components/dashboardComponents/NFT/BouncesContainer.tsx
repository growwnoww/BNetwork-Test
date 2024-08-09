"use client";
import { NFT_Address, NFT_ABI } from "@/contract/Web3_Instance";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCheckSquare } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";

type Props = {
  id: number;
  tokenId: number;
};

interface ClaimedRewardType {
  userAddress: string;
  nftId: number;
  nftType: number;
  rewardAmount: number;
}

type NFTData = {
  nftId: number;
  nftType: number;
};

interface NFTApiResponse {
  nftId: number;
  nftType: number;
  rewardAmount?: number;
  nftName?: string;
  _id: string;
}

interface ApiType {
  data: NFTApiResponse[];
}

const BouncesContainer = ({ id, tokenId }: Props) => {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isTime, setIsTime] = useState("");
  const [isTimeOver, setTimeOver] = useState<boolean>(false);
  const [rewardAmt, setReward] = useState<string>();
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [loader, setLoader] = useState(false);
  const [refetch, setRefetch] = useState(false); // State to trigger re-fetc
  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstance = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  // const [filteredDataToken, setFilteredDataToken] = useState<NFTData[]>([]);

  const filteredDataToken: NFTData[] = [];

  const getNFTNameById = (id: any) => {
    console.log("Id got ", id);
    const NFTName: { [id: number]: string } = {
      1: "Earth",
      2: "Mars",
      3: "Venus",
      4: "Saturn",
      5: "Neptune",
    };

    return NFTName[id];
  };

  function convertSecondsToDhms(seconds: number): string {
    // Get current time in seconds since the epoch
    const now = Math.floor(Date.now() / 1000);
  
    // Calculate expiry time
    const expiryTime = seconds;

  
    // Check if expiry time is in the past
    if (expiryTime <= now) {
      console.log("heelo ji")
      setIsTime("0d : 0h : 0m : 0s");
      return "0d : 0h : 0m : 0s";
    }
  
    // Calculate remaining time
    const remainingTime = expiryTime - now;
  

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (24 * 3600));
    const hours = Math.floor((remainingTime % (24 * 3600)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const remainingSeconds = Math.floor(remainingTime % 60);
  
    const formattedTime = `${days}d : ${hours}h : ${minutes}m : ${remainingSeconds}s`;

    setIsTime(formattedTime);
    return formattedTime;
  }
  

  const getBoughtTokenId = async (tokenType: number, tokenId: number) => {
    try {
      const getWithdrawTime = await nftContractInstance.tokenMetadata(
        tokenType,
        tokenId
      );
      const getExpiryTimeOfPool = await nftContractInstance.expiryDate();

      const rawTime = getExpiryTimeOfPool;
      const rawClaimTime = getWithdrawTime._claimDate;
      const withdrawTime = ethers.BigNumber.from(rawTime).toNumber();
      const claimrawTime = ethers.BigNumber.from(rawClaimTime).toNumber();

      let withTimeDhms = convertSecondsToDhms(withdrawTime);
      let claimTimeDhms = convertSecondsToDhms(claimrawTime);

      if (withTimeDhms === claimTimeDhms) {
        filteredDataToken.push({ nftType: tokenType, nftId: tokenId });
      }

      if (filteredDataToken) {
        const filteredData = filteredDataToken.map(({ nftId, nftType }) => ({
          nftId,
          nftType,
        }));

        setNftData(filteredData);
      }
    } catch (error) {
      console.log("something went wrong ", error);
    }
  };

  const getExpiryTime = async () => {
    try {
      const expiryTime = await nftContractInstance.expiryDate();
      startCountdown(expiryTime);
    } catch (error) {
      console.error(error);
    }
  };

  const startCountdown = (expiryTime: number) => {
    const now = Math.floor(Date.now() / 1000);
    let secondsLeft = expiryTime

    convertSecondsToDhms(secondsLeft);

    const interval = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft < 0) {
        clearInterval(interval);
        convertSecondsToDhms(0);
      } else {
        convertSecondsToDhms(secondsLeft);
      }
    }, 1000);
  };

  const getTimeOver = (time: string) => {
    if (time === "0d : 0h : 0m : 0s") {
      setTimeOver(true);
      return;
    }
    setTimeOver(false);
  };

  const getRewardAmount = async (tokenType: number, tokenId: number) => {
    try {
      const rawAmt = await nftContractInstance.releasedTokenAmt();
      const bigNumberAmount = ethers.BigNumber.from(rawAmt).toBigInt();
      console.log("big amount ", bigNumberAmount);
      const slicedString = String(bigNumberAmount).slice(0, -18);
      const rewardAmount = Number(slicedString);
      console.log("reward amount ", rewardAmount);

      const nfts = await nftContractInstance.totalNFT(tokenId);
      const allNfts = ethers.BigNumber.from(nfts).toNumber();

      let distributeAmt: number;
      switch (tokenId) {
        case 1:
          distributeAmt = rewardAmount * 0.1;
          break;
        case 2:
          distributeAmt = rewardAmount * 0.15;
          break;
        case 3:
          distributeAmt = rewardAmount * 0.2;
          break;
        case 4:
          distributeAmt = rewardAmount * 0.25;
          break;
        case 5:
          distributeAmt = rewardAmount * 0.3;
          break;
        default:
          distributeAmt = 0;
          break;
      }

      const amt: number = distributeAmt / allNfts;
      setReward(amt.toFixed(3));
    } catch (error) {
      console.log("");
    }
  };

  const claimReward = async (tokenType: number, tokenId: number) => {
    try {
      console.log(`Token type is ${tokenType} and token id is ${tokenId}`);
      setLoader(true); // Show loader
      const claimRewardRaw = await nftContractInstance.withdrawRewardByID(
        tokenType,
        tokenId,
        1
      );
      await claimRewardRaw.wait();
      toast.success("Reward Claimed Successfully!")
      setRefetch((prev) => !prev); // Trigger refetch
    } catch (error) {
      console.log("something went wrong in claim reward", error);
    } finally {
      setLoader(false); // Hide loader
    }
  };

  useEffect(() => {
    getTimeOver(isTime);
  }, [isTime]);

  useEffect(() => {
    getRewardAmount(id, tokenId);
    getBoughtTokenId(tokenId, id);
  }, [refetch]); // Re-fetch data when refetch state changes


  useEffect(()=>{
    getExpiryTime();

  },[])
  return (
    <>
    <Toaster/>
      <div className="flex items-center justify-center">
        <div className="flex items-center max-w-sm lg:max-w-md  space-x-5 lg:space-x-6 my-3  ">
          <div className="">
            {isTimeOver ? (
              <FaCheckSquare className="text-4xl text-green-500 " />
            ) : (
              <LuAlarmClock className="text-3xl " />
            )}
          </div>
          <div className="flex flex-col   ">
            <p className="text-sm lg:text-lg">Time for withdraw:</p>
            <p className="text-sm lg:text-lg">{isTime}</p>
          </div>
          <div>
            <p className="text-sm lg:text-lg">Reward</p>
            <p className="text-sm  lg:text-lg">${rewardAmt}</p>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-between ">
        <div className="flex items-center justify-center  gap-x-4 ">
          <p className="text-yellow-500 text-xs  lg:text-md">NFT Type: <span>{getNFTNameById(tokenId)}</span></p>
          <p  className="text-yellow-500 text-xs  lg:text-md">NFT Id: {id}</p>
        </div>
        <div className="flex items-end justify-end ">
        {isTimeOver ? 
         ''
        :
          nftData.some((nft) => nft.nftId === id) ? (
          <button
            className="bg-green-500 px-3 py-1 font-semibold rounded-lg text-xs lg:text-md"
            onClick={() => claimReward(tokenId, id)}
          >
            {loader ? "Claiming..." : "Claimed"}
          </button>
        ) : (
          <button
            className="bg-yellow-500 px-5 my-1 py-1 font-semibold rounded-lg text-xs lg:text-md"
            onClick={() => claimReward(tokenId, id)}
          >
            {loader ? "Claiming..." : "Claim"}
          </button>
        )
        }
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-1 h-[1px] w-full " />
    </>
  );
};

export default BouncesContainer;
