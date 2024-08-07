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
import { useRecoilState } from "recoil";
import { addNFT1, addNFT1Name, addNFT2, addnft1Atom, disableIdsAtom, selectNFTMerge } from "@/store/atom";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FadeLoader } from "react-spinners";

type AlertDialogProps = {
  title: string;
  NFTName: string;
  disbleNFTId: number[];
  onCancel: () => void;
  onCancelPop: () => void;
};
interface TokenIdsState {
  [key: number]: number[];
}

const NFTAddAlertDialog: React.FC<AlertDialogProps> = ({
  title,
  NFTName,
  disbleNFTId,
  onCancel,
  onCancelPop
}) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenIds, setTokenIds] = React.useState<TokenIdsState>({});
  const [loader,setLoader] = React.useState(true)
  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstnace = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  const [selectId, setSelectId] = useState<number | null>(null)
  const [isSelected1, setIsSelected1] = useRecoilState(addNFT1)

  const [selectedNFTname, setSelectedNFTname] = useRecoilState(addNFT1Name);
  const [nftId, setNftId] = useRecoilState(addnft1Atom);
  const [selectNFTs, setSelectNFTs] = useRecoilState(selectNFTMerge)
  const [disbaleIds, setDisbaleIds] = useRecoilState(disableIdsAtom)

  const [disableIds] = useRecoilState(disableIdsAtom);

  const getBasisClass = (activeIdsLength: number) => {
    if (activeIdsLength >= 3) {
      return "basis-1/1 lg:basis-1/3 ";
    } else if (activeIdsLength === 2) {
      return "basis-1/1 lg:basis-1/2";
    } else if (activeIdsLength === 1){
      return "basis-1/1 flex items-center justify-center   lg:translate-x-1/3"
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
    } catch (error) { }
    finally{
      setLoader(false)
    }
  };
  const handleOnClick = async (id: number) => {
    console.log("NFT token id is", id);

    setNftId(id)
    setDisbaleIds((prevIds) => [...prevIds, id]);
    // Update selection states based on new selection
    setSelectId(id);
    setSelectedNFTname(NFTName);
    setIsSelected1(true)
    // Update `selectNFTs` state
    setSelectNFTs(false);
  };




  useEffect(() => {
    console.log("recoild state of nft 1  id ", nftId)
    console.log("selected 1 value", isSelected1)
  }, [nftId, , isSelected1])

  useEffect(() => {
    getUserTotalNFTs();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] "></div>
      <div className="bg-zinc-800 rounded-lg shadow-lg w-auto md:w-1/2 md:h-[30rem] p-6 z-10 flex flex-col items-center justify-center mx-9">
        <div className="flex items-end justify-end w-full -translate-y-5 translate-x-5 lg:translate-x-0  lg:-translate-y-8">
          <p className="rounded-full hover:bg-neutral-600">
            <IoCloseSharp className="text-2xl lg:text-4xl" onClick={onCancelPop} />
          </p>
        </div>
        <div>
          <div>
            <div className="-translate-y-10 flex items-center justify-center mt-10 lg:mt-0">
              <p className="text-lg lg:text-3xl text-center  ">
                Upgrade NFT by Merging them
              </p>
            </div>


            {
              loader?
              <div className="w-44 h-44 lg:w-56 lg:h-56 flex items-center justify-center translate-x-1/4 lg:translate-x-1/2">
              <div className="flex items-center justify-center w-full h-full ">
                    <p className="text-lg lg:text-3xl text-center">
                      <div className="flex items-center justify-center"><FadeLoader color="#ffd008" /></div>
                    <p className="text-sm lg:text-lg">Fetching your NFTs....</p>
                    </p>
                  </div>
              </div>
              :


            <div className="flex gap-x-5">

            <Carousel className="w-full ">
              <CarouselContent className="-ml-1">
                {Object.entries(tokenIds).map(([tokenId, ids]) => {
                  const activeIds = ids.filter((id: number) => !disableIds.includes(id));
                  const activeIdsLength = activeIds.length;

                  return activeIds.map((id: any) => (
                    <CarouselItem key={`${tokenId}-${id}`} className={` ${getBasisClass(activeIdsLength)} bg-transparent `}>
                      <div className="p-1  w-fit translate-x-1 " onClick={onCancel}>
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


            }

          


          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6"></p>
      </div>
    </div>
  );
};

export default NFTAddAlertDialog;
