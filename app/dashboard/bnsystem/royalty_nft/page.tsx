"use client";
import { AlertDemo } from "@/components/dashboardComponents/NFT/Alert";
import { CardWithForm } from "@/components/dashboardComponents/NFT/CreateCardNFT";
import NFT_Container from "@/components/dashboardComponents/NFT/NFT_Container";
import YourNFTs from "@/components/dashboardComponents/NFT/YourNFTs";
import SparklesText from "@/components/magicui/sparkles-text";
import { NFT_Address, NFT_ABI } from "@/contract/Web3_Instance";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const RoyaltyNFT = () => {
  const {walletProvider} = useWeb3ModalProvider()
  const {address} = useWeb3ModalAccount()
  const [justNFT,setJustNFT] = useState<boolean>(false)
  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstnace = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  


  const isUserHasJustNFT = async () =>{
    try {
      const userInfo = await nftContractInstnace.userMetadata(address);
      const isTrue = userInfo._justToken

      if(isTrue){
      setJustNFT(true)
      return;
      }
      else{
        return;
      }
    } catch (error) {
      console.log("something went wrong in the isUserHasJustNFT ",error)
    }
  }


  useEffect(()=>{
   isUserHasJustNFT()
  },[address])

  return (
    <div className="mb-10 w-[80vw]">
      <div className="h-16 lg:h-20 w-full bg-zinc-900 rounded-2xl my-3 mx-8 flex items-center justify-center">
      <SparklesText text="Royalty NFTs"  />
      </div>

      <div className="grid grid-col-2  ">
        <div className="border-b-1 border-b-zinc-700  h-[30rem]   flex flex-col items-center justify-center w-full  mx-5 lg:mx-0">
          {/* <p className="text-4xl border-b-2 border-yellow-400 -translate-y-4">Create NFTs</p>
          <div className="bg-zinc-900 h-80 w-[50rem] rounded-2xl">

          </div> */}

          <CardWithForm/>
        </div>
        <div className="mx-4 w-full  lg:w-[80vw] ">
          <div className="h-16 lg:h-20 w-full bg-zinc-900 rounded-2xl my-3 mx-6 flex items-center justify-center">
            <p className="text-3xl lg:text-4xl font-semibold ">Your NFTs</p>
          </div>
          <div className="flex  items-center justify-center my-4 mx-5">
            <AlertDemo/>
          </div>
         <YourNFTs isJustNFT={justNFT}/>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};


export default RoyaltyNFT;
