"use client";
import AlertDialog from "@/components/dashboardComponents/NFT/AlertDialog";
import Bounces from "@/components/dashboardComponents/NFT/Bounces";
import MergeAlertDialog from "@/components/dashboardComponents/NFT/MergeAlertDialog";
import NFTAddAlertDialog from "@/components/dashboardComponents/NFT/NFTAddAlertDialog";
import NFTAddAlertDialog2 from "@/components/dashboardComponents/NFT/NFTAddAlertDialog2";
import RemoveNFTAlert from "@/components/dashboardComponents/NFT/RemoveNFTAlert";
import { ShootingStarsAndStarsBackgroundDemo } from "@/components/dashboardComponents/NFT/Shooting-Stars";
import { NFT_Address, NFT_ABI } from "@/contract/Web3_Instance";
import {
  addNFT1,
  addnft1Atom,
  addNFT2,
  addnft2Atom,
  disableIdsAtom,
  selectNFTMerge,
  selectNFTs1,
} from "@/store/atom";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { id } from "ethers/lib/utils";
import { truncate } from "fs/promises";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import { FaFlushed } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

function separateNumber(input: string): { nftName: string; number: number } {
  // Regular expression to match the text and the number separately
  const regex = /^([a-zA-Z_]+)(\d+)$/;
  const match = input.match(regex);

  if (!match) {
    throw new Error("Input format is incorrect");
  }

  return {
    nftName: match[1], // The first capturing group (text part)
    number: parseInt(match[2], 10), // The second capturing group (number part)
  };
}

const BuyAndMergeNFTs = ({ params }: { params: { createNFTs: string } }) => {
  const searchParams = useSearchParams();
  const paramsData = Object.values(params);
  const extractParamsData = separateNumber(String(paramsData));
  const currentNFT = extractParamsData.nftName;
  const currentNFTnumber = extractParamsData.number;
  console.log("currentNFTNUmber", currentNFTnumber);
  console.log("params value ", currentNFT);
  const [buy, setBuy] = useState<boolean>(false);
  const [selectNFT1, setSelectNFT1] = useState<boolean>(false);
  const [selectNFT2, setSelectNFT2] = useState<boolean>(false);
  const [isSelected1, setSelected1] = useRecoilState(addNFT1);
  const [isSelected2, setSelected2] = useRecoilState(addNFT2);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isRemoveDialogOpen1,setIsRemoveDialogOpen1] = useState(false)
  const [selectNFTs, setSelectNFTs] = useRecoilState(selectNFTMerge);
  const [selectNfts1, setSelectNfts1] = useRecoilState(selectNFTs1);
  const { walletProvider } = useWeb3ModalProvider();
  const [disbaleIds, setDisbaleIds] = useRecoilState(disableIdsAtom);
  const [nft1,setNft1] = useRecoilState(addnft1Atom);
  const [nft2,setNft2] = useRecoilState(addnft2Atom);
  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstnace = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  const router = useRouter()

  const handleBuyClick = () => {
    setIsDialogOpen(true);
    setBuy(true);
  };

  const handleCancel = () => {
    setBuy(false);
    setIsDialogOpen(false)
    setSelected1(false);
    setSelected2(false);
    router.push('/dashboard/bnsystem/royalty_nft')
  };

  const handleSelectPopExit1 = () => {
    setSelectNFTs(false);
  };
  const handleSelectPopExit2 = () => {
    setSelectNfts1(false);
  };

  const addNFTHandler1 = () => {
    setSelectNFT1(true);
    setSelectNFT2(false);
    setSelectNFTs(true);
  };

  const addNFTHandler2 = () => {
    setSelectNFT2(true);
    setSelectNFT1(false);
    setSelectNfts1(true);
  };

  const handleAddNFTCancel = () => {
    setSelectNFT1(false);
    setSelectNFT2(false);
  };

  const handleNFTRemoveBought = (nftId: number) => {
    if (nftId === 1) {
      setSelected1(false);
      console.log('hi from 1')
      setDisbaleIds((prev) => prev.filter((id) => id !== nft1));
      setIsRemoveDialogOpen(true);

    } else if (nftId === 2) {
      setSelected2(false);
      console.log("hi from 2")
      setDisbaleIds((prev) => prev.filter((id) => id !== nft2));
      setIsRemoveDialogOpen1(true);

    }

  };

  const handleRemoveNFTCancel1 = () => {
    setIsRemoveDialogOpen(false);
    setSelected1(false);
  };
  const handleRemoveNFTCancel2 = () => {
    setIsRemoveDialogOpen1(false);
    setSelected2(false);
  };


  const getNFTIdByName = (id: any) => {
    console.log("Id got ", id);
    const NFTName: { [id: string]: number } = {
      Earth_NFT: 1,
      Mars_NFT: 2,
      Venus_NFT: 3,
      Saturn_NFT: 4,
      Neptune_NFT: 5,
    };

    return NFTName[id];
  };

  const handlemergeNFTs = async () => {
    try {
      if (!isSelected1 || !isSelected2) {
        toast.error("First you have to add NFTs");

        return;
      }

      const nftType = getNFTIdByName(currentNFT);
      const mergeNfts = await nftContractInstnace.mergeNFT(
        Number(currentNFTnumber),
        nft1,
        nft2,
        nftType
      );
      await mergeNfts.wait();
      const tranx = mergeNfts.hash;

      if (tranx) {
        toast.success("Merge NFT Successfully");

        handleBuyClick();
      }
    } catch (error) {
      console.log("something went wrong in merge nft ", error);
    }
  };

  const removeNFTs = () =>{
    setSelected1(false);
    setSelected2(false);
    
    setDisbaleIds((prevIds) => prevIds.filter(id => id !== nft1 && id !== nft2 && id !== currentNFTnumber));
    console.log("hello i am clicked")
  }

  const removeNFTSelected = ()=>{
    setIsRemoveDialogOpen(false);

  }



  useEffect(() => {
    console.log("selected value of 2 ", isSelected2);
  }, [isSelected2]);

  useEffect(()=>{
    console.log("nft 1 is  ",nft1)
    console.log("nft 2 is  ",nft2)
    console.log("disbale ids nft in main",disbaleIds)
    },[disbaleIds])

  useEffect(() => {
    let id = currentNFTnumber;
    setDisbaleIds((prevIds) => [...prevIds, id]);
    console.log("nft 1 is  ",nft1)
    console.log("nft 2 is  ",nft2)

  

  }, []);

  return (
    <div>
      <Toaster/>
      <div className="">
        <Link href="/dashboard/bnsystem/royalty_nft" onClick={removeNFTs}>
          <p className="text-xl font-medium py-3">Back to NFT List</p>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-x-4 gap-y-5 mx-4">
        <div className="lg:flex-[29%] h-auto bg-black  rounded-xl">
          <div className="bg-neutral-800 h-24 border-b-2 border-yellow-500  rounded-tl-xl rounded-tr-xl flex items-center justify-start pl-4">
            <p className="text-2xl ">{currentNFT} # {currentNFTnumber}</p>
          </div>
          <ShootingStarsAndStarsBackgroundDemo currentNFT={currentNFT} />
        </div>
        <div className="lg:flex-[39%] lg:h-[20rem] bg-zinc-900 rounded-xl">
          <div className="bg-neutral-800 h-24 rounded-tl-xl rounded-tr-xl flex items-center justify-start pl-4">
            <p className="text-2xl">NFT Upgrade</p>
          </div>
          <div className="w-full">
            <p className="border-b-2 border-yellow-500 w-fit ml-4">By Merge</p>

            <div className="flex flex-col lg:flex-row items-center ">
              <div className="flex flex-col gap-y-4 lg:flex-row  gap-x-4 ml-4 mt-4">
                <div className="h-44 w-44  lg:h-32 lg:w-24  border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center">
                  <video autoPlay loop muted height={150} width={150}>
                    <source src={`/${currentNFT}.mp4`} type="video/mp4" />
                  </video>
                </div>
                <div className="h-44 w-44 lg:h-32 lg:w-24  border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center">
                  <div>
                    {isSelected1 ? (
                      <div className="h-44 w-44  lg:h-32 lg:w-24 border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center">
                        <video
                          autoPlay
                          loop
                          muted
                          height={80}
                          width={80}
                          onClick={() => handleNFTRemoveBought(1)}
                        >
                          <source src={`/${currentNFT}.mp4`} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <button
                        onClick={addNFTHandler1}
                        className="text-sm bg-stone-700 px-1 py-2 rounded-lg hover:bg-stone-800"
                      >
                        {" "}
                        &#43; Add NFT
                      </button>
                    )}
                  </div>
                </div>
                <div className="h-44 w-44  lg:h-32 lg:w-24  border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center">
                  <div>
                    {isSelected2 ? (
                      <div className="h-44 w-44  lg:h-32 lg:w-24 border-2 border-dashed rounded-lg border-slate-700 hover:border-2 hover:border-yellow-400 flex items-center justify-center">
                        <video
                          autoPlay
                          loop
                          muted
                          height={80}
                          width={80}
                          onClick={() => handleNFTRemoveBought(2)}
                        >
                          <source src={`/${currentNFT}.mp4`} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <button
                        onClick={addNFTHandler2}
                        className="text-sm bg-stone-700 px-1 py-2 rounded-lg hover:bg-stone-800"
                      >
                        &#43; Add NFT
                      </button>
                    )}
                  </div>

                  {/* <div>
              <button
              onClick={addNFTHandler}
              className='text-sm bg-stone-700 px-1 py-2 rounded-lg hover:bg-stone-800'> 	&#43; Add NFT</button>
            </div> */}
                </div>
              </div>

              <div className=" flex flex-col items-center justify-center">
                <p className="text-[12px] text-yellow-400 text-center  p-2">
                  Merge upgrade increases by one level at once
                </p>
                <button
                  onClick={handlemergeNFTs}
                  className="bg-neutral-700 px-5 rounded-lg py-3 my-3 lg:my-0"
                >
                  Merge
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-[31%] h-auto bg-zinc-900  rounded-xl ">
          <div className="bg-neutral-800 h-24 rounded-tl-xl rounded-tr-xl flex flex-col items-center justify-center pl-4  ">
            <p className="text-2xl">Your Bonuses</p>
            <p className="text-xs opacity-65 text-yellow-500">Your bonus can grow every day, upgrade your NFT to increase your income</p>
          </div>
          <div className="flex items-center justify-center h-full w-full">
            {/* <p className="text-3xl font-semibold text-center">Available Soon</p> */}
             {/* <Bounces/> */}
          </div>
        </div>
      </div>
      

      {isDialogOpen && (
        <MergeAlertDialog
          title={`${currentNFT} NFTs`}
          message={`You have successfully minit the ${currentNFT}  🎉🤟`}
          onCancel={handleCancel}
          NFTName={currentNFT}
        />
      )}
      {isRemoveDialogOpen && (
        <RemoveNFTAlert
          NFTName={String(currentNFT)}
          title={""}
          message={""}
          handleRemoveNFTCancel={handleRemoveNFTCancel1}
          onCancelPop={removeNFTSelected}
        />
      )}
       {isRemoveDialogOpen1 && (
        <RemoveNFTAlert
          NFTName={String(currentNFT)}
          title={""}
          message={""}
          handleRemoveNFTCancel={handleRemoveNFTCancel2}
          onCancelPop={removeNFTSelected}
        />
      )}

      {selectNFTs && (
        <NFTAddAlertDialog
          title={currentNFT}
          NFTName={String(currentNFT)}
          disbleNFTId={disbaleIds}
          onCancel={handleAddNFTCancel}
          onCancelPop={handleSelectPopExit1}
        />
      )}

      {selectNfts1 && (
        <NFTAddAlertDialog2
        title={currentNFT}
        NFTName={String(currentNFT)}
          onCancel={handleAddNFTCancel}
          onCancelPop={handleSelectPopExit2}
        />
      )}
    </div>
  );
};

export default BuyAndMergeNFTs;
