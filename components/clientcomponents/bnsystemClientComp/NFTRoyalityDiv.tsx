import LevelIcon from '@/components/dashboardComponents/LevelIcon'
import React, { useEffect, useState } from 'react'
import BtnWrapper from '@/components/WrapperComponent/BtnWrapper';
import { IoIosUnlock } from 'react-icons/io';
import { clubA_Address } from '@/contract/ClubAContract/ClubA_Instance';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { NFT_ABI, NFT_Address } from '@/contract/Web3_Instance';
import { useRecoilState } from 'recoil';
import { updateYourNFTs } from '@/store/atom';
import JustNFTLevelIcon from '@/components/dashboardComponents/NFT/JustNFTLevelIcon';
import NFTLevelSVG from '@/components/dashboardComponents/NFT/NFTLevelSVG';
import NFTNotAvailable from '@/components/dashboardComponents/NFT/NFTNotAvaliable';

interface TokenIdsState {
  [key: number]: number[];
}


const NFTRoyalityDiv = () => {
  const levels = Array.from({ length: 5 }, (_, i) => i + 1);

  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenIds, setTokenIds] = React.useState<TokenIdsState>({});
  const [tokenType, setTokenType] = React.useState<{ [key: string]: number }>({});
  const provider = new ethers.providers.Web3Provider(walletProvider as any);
  const signer = provider.getSigner();
  const nftContractInstance = new ethers.Contract(NFT_Address, NFT_ABI, signer);
  const [availabeNFTS,setAvailableNFTs] = React.useState<number[]>()
  const [isJustNFTBuy,setIsJustNFTBuy] = useState(false)

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

  const getJustNft = async () =>{
    try {
      const methodInfo = await nftContractInstance.userMetadata(address);
      const isBought = methodInfo._justToken;

      setIsJustNFTBuy(isBought)
    } catch (error) {
      
    }
  }

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
  useEffect(() => {
    if (Object.keys(tokenType).length > 0) {
      fetchTokenIds();
      const keys = Object.keys(tokenType);
      const lastKey = keys[keys.length - 1];
      setAvailableNFTs((prev:any) => {
        const newKeys = Object.keys(tokenType).map(key => {
          const numberPart = parseInt(key.replace(/\D/g, ''), 10); // Extract the numeric part of the key
          return numberPart;
        });
        
        const combinedKeys = prev ? [...prev, ...newKeys] : newKeys;
        const uniqueKeys = Array.from(new Set(combinedKeys)); // Ensure no duplicates
        return uniqueKeys;
      });
       }
    console.log("token type in state ->>>> ", Object.keys(tokenType));
  }, [tokenType]);

  useEffect(() => {
    if (availabeNFTS && availabeNFTS!.length > 0) {
      console.log("available NFTs ids are -->", availabeNFTS);
    }
    console.log("available NFTs ids are -->", availabeNFTS);

    
  }, [availabeNFTS]);


  useEffect(() => {
    getUserTotalNFTs();
    getJustNft();
    console.log("tokens ", tokenType);

  }, [])
  return (
    <div className='bg-[#1f1f1f] flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between py-8 m-3 rounded-md'>
         <div className="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl  px-3"> NFT Royalty</div>
       <div className='flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-between mr-0 lg:mr-10 gap-x-40'>
       <div className='h-fit grid grid-cols-3 w-fit gap-x-2 '>
       <JustNFTLevelIcon isJustNFTBought={isJustNFTBuy}/>
     
        {levels.map((level) => (
            availabeNFTS && availabeNFTS.includes(level) ? (
              <NFTLevelSVG key={level.toString()} level={level} id={`NFT-level-${level}`} />
            ) : (
              <NFTNotAvailable key={level.toString()} level={level} id={`NFT-level-${level + 2}`} context="NFT" />
            )
          ))}
          
        </div>
        <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              path='/dashboard/bnsystem/royalty_nft'
            />
            {/* <IoIosUnlock className="absolute right-[10%]" /> */}
          </div>
       </div>

        
</div>
  )
}

export default NFTRoyalityDiv