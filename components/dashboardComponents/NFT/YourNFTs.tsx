"use client";
import { NFT_Address, NFT_ABI } from "@/contract/Web3_Instance";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import NFT_Container from "./NFT_Container";
import { useRecoilState } from "recoil";
import { updateYourNFTs } from "@/store/atom";

interface TokenIdsState {
  [key: number]: number[];
}

const YourNFTs = ({ isJustNFT }: { isJustNFT: boolean }) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenIds, setTokenIds] = React.useState<TokenIdsState>({});
  const [tokenType, setTokenType] = React.useState<{ [key: string]: number }>({});
  const [updateNFT, setUpdateNFT] = useRecoilState(updateYourNFTs);
  const [loading, setLoading] = React.useState(false);
  const [justNftNum,setJustNFTNum] = React.useState<number>();
  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstance = new ethers.Contract(NFT_Address, NFT_ABI, signer);

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
        const tokenId = parseInt(key.replace('NFT', ''), 10);
        const getTokenId = await nftContractInstance.getUserTokens(tokenId, address);

        const extractedTokenIds: number[] = [];

        for (const innerArray of getTokenId) {
          for (const bigNumber of innerArray) {
            const extractedTokenId = ethers.BigNumber.from(bigNumber).toNumber();
            console.log("Extracted Token ID is", extractedTokenId);
            extractedTokenIds.push(extractedTokenId);
          }
        }

        setTokenIds((prevState) => ({
          ...prevState,
          [tokenId]: extractedTokenIds,
        }));
      }
    }
  };

  const getUserTotalNFTs = async () => {
    try {
      console.log("hello nft");

      const getTotalNFTs = await nftContractInstance.userMetadata(address);
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

    } catch (error) {
      console.error("Error fetching user total NFTs:", error);
    }
  };
  
  const getJustNFTNumber = async () =>{
    try {
  console.log("gello💎")
   
    const rawNFTs = await nftContractInstance.userMetadata(address);
    const justNftNumber = rawNFTs.SNFT;
    console.log("just nftNumber",justNftNumber);
    setJustNFTNum(justNftNumber)
  
        
    } catch (error) {
      setJustNFTNum(0)

    }
  }
  

  useEffect(() => {
    if (tokenIds) {
      console.log("token ids are ", tokenIds);
    }
  }, [tokenIds]);

  useEffect(() => {
    if (Object.keys(tokenType).length > 0) {
      fetchTokenIds();
    }
    console.log("token type in state ->>>> ",tokenType)
  }, [tokenType]);

  useEffect(() => {
    getUserTotalNFTs();
    console.log("tokens ", tokenType);
    getJustNFTNumber()

  }, []);

  // Refetch data and reload component when updateNFT changes
  useEffect(() => {
    if (updateNFT) {
      setLoading(true);
      getUserTotalNFTs().then(() => {
        setTimeout(() => {
          setLoading(false);
          setUpdateNFT(false); // Reset the update flag
        }, 2000); // Display loader for 2 seconds
      });
    }
  }, [updateNFT, setUpdateNFT,isJustNFT,setJustNFTNum]);

  return (
    <div className="flex gap-x-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-12 gap-y-7 mx-6">
        {loading ? (
          <div className="loader">Loading...</div> // Add your loader component or styling here
        ) : (
          <>
            {isJustNFT && (
              <div>
                <NFT_Container title="Just NFT" nft={`/just_spaceship.mp4`} nft_num={justNftNum} />
              </div>
            )}

            {Object.entries(tokenIds).map(([tokenId, ids]) =>
              ids.map((id: number) => (
                <NFT_Container
                  key={`${tokenId}-${id}`}
                  title={`${getNFTNameById(tokenId)}`}
                  nft_num={id.toString()}
                  nft={`/${getNFTNameById(tokenId)}.mp4`}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default YourNFTs;
