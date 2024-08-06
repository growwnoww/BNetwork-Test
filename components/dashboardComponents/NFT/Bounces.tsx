"use client";
import { NFT_ABI, NFT_Address } from "@/contract/Web3_Instance";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import BouncesContainer from "./BouncesContainer";
import { FadeLoader } from "react-spinners";

type Props = {};

interface TokenIdsState {
  [key: number]: number[];
}

const Bounces = (props: Props) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenIds, setTokenIds] = React.useState<TokenIdsState>({});
  const [tokenType, setTokenType] = React.useState<{ [key: string]: number }>(
    {}
  );
  const [loading, setLoading] = useState(true);

  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstnace = new ethers.Contract(NFT_Address, NFT_ABI, signer);

  const getNFTNameById = (id: any) => {
    console.log("Id got ", id);
    const NFTName: { [id: number]: string } = {
      1: "Earth_NFT",
      2: "Mars_NFT",
      3: "Venus_NFT",
      4: "Saturn_NFT",
      5: "Neptune_NFT",
    };

    return NFTName[id];
  };

  const fetchTokenIds = async () => {
    for (const [key, value] of Object.entries(tokenType)) {
      if (value > 0) {
        const tokenId = parseInt(key.replace("NFT", ""), 10);
        const getTokenId = await nftContractInstnace.getUserTokens(
          tokenId,
          address
        );

        const extractedTokenIds: number[] = [];

        for (const innerArray of getTokenId) {
          for (const bigNumber of innerArray) {
            const extractedTokenId =
              ethers.BigNumber.from(bigNumber).toNumber();
            console.log("Extracted Token ID is", extractedTokenId);
            extractedTokenIds.push(extractedTokenId);
          }
        }

        setTokenIds((prevState: any) => ({
          ...prevState,
          [tokenId]: extractedTokenIds,
        }));
      }
    }
  };

  const getUserTotalNFTs = async () => {
    try {
      console.log("helo nft");

      const getTotalNFTs = await nftContractInstnace.userMetadata(address);
      const formattedResponse = {
        NFT1: ethers.BigNumber.from(getTotalNFTs.NFT1).toNumber(),
        NFT2: ethers.BigNumber.from(getTotalNFTs.NFT2).toNumber(),
        NFT3: ethers.BigNumber.from(getTotalNFTs.NFT3).toNumber(),
        NFT4: ethers.BigNumber.from(getTotalNFTs.NFT4).toNumber(),
        NFT5: ethers.BigNumber.from(getTotalNFTs.NFT5).toNumber(),
      };

      console.log("formatted response", formattedResponse);

      const nftKeys: (keyof typeof formattedResponse)[] = [
        "NFT1",
        "NFT2",
        "NFT3",
        "NFT4",
        "NFT5",
      ];

      const newTokenType: { [key: string]: number } = {};

      for (const key of nftKeys) {
        const value = formattedResponse[key];
        console.log("value is ", value);
        if (value > 0) {
          newTokenType[key] = value;
        }
      }
      console.log("newTokenType object", newTokenType);

      setTokenType(newTokenType);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user total NFTs:", error);
    }
  };



  useEffect(() => {
    if (Object.keys(tokenType).length > 0) {
      fetchTokenIds();
    }
  }, [tokenType]);

  useEffect(() => {
    getUserTotalNFTs();
    console.log("tokens ", tokenType);
  }, []);

  return (
    <div className=" h-full ">
      {loading ? (
      <div className="flex items-center justify-center translate-y-44">
         <FadeLoader 
   color="#ffd008"
   />
      </div>

      ) : (
        Object.entries(tokenIds).map(([tokenId, ids]) =>
          ids.map((id: number) => (
            <BouncesContainer
              key={`${tokenId}-${id}`}
              id={id}
              tokenId={Number(tokenId)}
            />
          ))
        )
      )}
    </div>
  );
};

export default Bounces;
