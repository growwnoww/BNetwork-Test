'use client'
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import YourNFTs from "./YourNFTs";
import { NFT_Address, NFT_ABI } from "@/contract/Web3_Instance";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import { useRecoilState, useRecoilValue } from "recoil";
import { addNFT1, addnft1Atom, addNFT1Name, addNFT2, addnft2Atom, disableIdsAtom, selectNFTMerge, selectNFTs1 } from "@/store/atom";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type AlertDialogProps = {
  title: string;
  NFTName: string;
  onCancel: () => void;
  onCancelPop:()=> void;
};
interface TokenIdsState {
  [key: number]: number[];
}

const NFTAddAlertDialog2: React.FC<AlertDialogProps> = ({
  title,
  NFTName,
  onCancel,
  onCancelPop
}) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenIds, setTokenIds] = React.useState<TokenIdsState>({});

  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstnace = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  const [selectId,setSelectId] = useState<number | null>(null)
  const [isSelected2,setIsSelected2] = useRecoilState(addNFT2)

  const [selectedNFTname,setSelectedNFTname]  = useRecoilState(addNFT1Name);
  const [nftId,setNftId] = useRecoilState(addnft2Atom);
  const [selectNfts1,setSelectNfts1] = useRecoilState(selectNFTs1)
  const [disbaleIds,setDisbaleIds] = useRecoilState(disableIdsAtom)

  const getBasisClass = (activeIdsLength: number) => {
    if (activeIdsLength >= 3) {
      return "basis-1/1 lg:basis-1/3 ";
    } else if (activeIdsLength === 2) {
      return "basis-1/1 lg:basis-1/2";
    } else if (activeIdsLength === 1){
      return "basis-1/1 flex items-center justify-center  translate-x-[20%]"
    }
  };


  const getNFTNameById = (
    id: string
  ): "NFT1" | "NFT2" | "NFT3" | "NFT4" | "NFT5" => {
    console.log("Id got ", id);
    const NFTName: {
      [key: string]: "NFT1" | "NFT2" | "NFT3" | "NFT4" | "NFT5";
    } = {
      Earth_NFT: "NFT1",
      Mars_NFT: "NFT2",
      Venus_NFT: "NFT3",
      Saturn_NFT: "NFT4",
      Neptune_NFT: "NFT5",
    };

    return NFTName[id];
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

  const getUserTotalNFTs = async () => {
    try {
      console.log("helo nft");

      const getTotalNFTs = await nftContractInstnace.userMetadata(address);

      const formattedResponse: {
        NFT1: number;
        NFT2: number;
        NFT3: number;
        NFT4: number;
        NFT5: number;
      } = {
        NFT1: ethers.BigNumber.from(getTotalNFTs.NFT1).toNumber(),
        NFT2: ethers.BigNumber.from(getTotalNFTs.NFT2).toNumber(),
        NFT3: ethers.BigNumber.from(getTotalNFTs.NFT3).toNumber(),
        NFT4: ethers.BigNumber.from(getTotalNFTs.NFT4).toNumber(),
        NFT5: ethers.BigNumber.from(getTotalNFTs.NFT5).toNumber(),
      };

      const nftKey: keyof typeof formattedResponse = getNFTNameById(NFTName);
      console.log("nft key is", nftKey);

      const getNFTNum = formattedResponse[nftKey];
      console.log("GetNFTNUM ", getNFTNum);

      console.log(
        "get total nfts length ",
        Object.values(formattedResponse.NFT1)
      );

      const TokenType = getNFTIdByName(NFTName);

      const getTokenId = await nftContractInstnace.getUserTokens(
        TokenType,
        address
      );
      const tokenId = TokenType;

      const extractedTokenIds: number[] = [];

      for (const innerArray of getTokenId) {
        for (const bigNumber of innerArray) {
          const extractedTokenId = ethers.BigNumber.from(bigNumber).toNumber();
          console.log("Extracted Token ID is", extractedTokenId);
          extractedTokenIds.push(extractedTokenId);
        }
      }

      setTokenIds((prevState: any) => ({
        ...prevState,
        [tokenId]: extractedTokenIds,
      }));
    } catch (error) {}
  };
  const handleOnClick = async (id: number) => {
    console.log("NFT token id is", id);
  
     setNftId(id)
     setDisbaleIds((prevIds) => [...prevIds, id]);

    setSelectId(id);
    setSelectedNFTname(NFTName);
    setIsSelected2(true)
    setSelectNfts1(false)
    // Update `selectNFTs` state
  };
  
 
  

 useEffect(()=>{
  console.log("recoild state of nft 2  id ",nftId)
  console.log("selected 2 value",isSelected2)
 },[nftId,,isSelected2])

  useEffect(() => {
    getUserTotalNFTs();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] "></div>
      <div className="bg-zinc-800 rounded-lg shadow-lg w-11/12 md:w-1/2 md:h-[30rem] p-6 z-10 flex flex-col items-center justify-center">
        <div className="flex items-end justify-end w-full  -translate-y-12">
          <p className="rounded-full hover:bg-neutral-600">
            <IoCloseSharp className="text-4xl" onClick={onCancelPop} />
          </p>
        </div>
        <div>
          <div>
            <div className="-translate-y-10">
              <p className="text-3xl text-center">
                Upgrade NFT by Merging them
              </p>
            </div>
            <div className="flex gap-x-5">
            <Carousel className="w-full ">
                <CarouselContent className="-ml-1">
                  {Object.entries(tokenIds).map(([tokenId, ids]) => {
                    const activeIds = ids.filter((id: number) => !disbaleIds.includes(id));
                    const activeIdsLength = activeIds.length;

                    return activeIds.map((id: any) => (
                      <CarouselItem key={`${tokenId}-${id}`} className={` ${getBasisClass(activeIdsLength)} bg-transparent `}>
                        <div className="p-1  w-fit " onClick={onCancel}>
                          <Card className=" h-fit border-none">
                            <CardContent className="relative flex  items-center justify-center">
                              <div className="absolute top-0 right-6">
                              <p className="bg-yellow-500 rounded-lg px-1 text-sm"># {id}</p>
                              </div>
                              <video
                                autoPlay
                                loop
                                muted
                                // height={270}
                                // width={270}
                                className="object-contain border border-yellow-500 rounded-xl w-44 h-44 lg:w-56 lg:h-56"
                                onClick={(e) => handleOnClick(id)}
                              >
                                <source src={`/${NFTName}.mp4`} type="video/mp4" />
                              </video>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ));
                  })}
                </CarouselContent>
                <CarouselPrevious  className="bg-black text-white translate-x-8"/>
                <CarouselNext  className="bg-black text-white -translate-x-8"/>
              </Carousel>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6"></p>
      </div>
    </div>
  );
};

export default NFTAddAlertDialog2;
