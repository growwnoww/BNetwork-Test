"use client";
import { NFT_ABI, NFT_Address } from "@/contract/Web3_Instance";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import BouncesContainer from "./BouncesContainer";
import { FadeLoader } from "react-spinners";

interface TokenId {
  tokenType: number;
  tokenId: number;
}

type TokenIdsState = TokenId[];

const Bounces = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [tokenIds, setTokenIds] = useState<TokenIdsState>([]);

  // tokenType state remains unchanged
  const [tokenType, setTokenType] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const checkValidRewardNFTs = async (
    allNFTIds: { tokenType: number; tokenId: number }[]
  ) => {
    try {
      const validRewardNFTs: { tokenType: number; tokenId: number }[] = [];
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const nftContractInstnace = new ethers.Contract(
        NFT_Address,
        NFT_ABI,
        signer
      );
  
      // Create an array of promises to handle the async operations
      const promises = allNFTIds.map(async (value) => {
        console.log(
          `Before validating the NFT mint time: token type ${value.tokenType} and id ${value.tokenId}`
        );
        const rawData = await nftContractInstnace.tokenMetadata(
          value.tokenType,
          value.tokenId
        );
        const mintTime = rawData._mintdate;
        const _mintTime = ethers.BigNumber.from(mintTime).toNumber();
        console.log("Mint time is", _mintTime);
  
        // Check the mint time and push valid NFTs
        if (_mintTime < 1724608560) {
          validRewardNFTs.push({
            tokenType: value.tokenType,
            tokenId: value.tokenId,
          });
        }
      });
  
      // Wait for all promises to resolve
      await Promise.all(promises);
  
      // Once all promises are resolved, set the state
      setTokenIds(validRewardNFTs);
  
      // Return or process validRewardNFTs as needed
      console.log("Valid reward NFTs:", validRewardNFTs);
    } catch (error) {
      console.error("Error checking valid reward NFTs:", error);
    }
  };
  

  const fetchTokenIds = async () => {
    const updatedTokenIds: { tokenType: number; tokenId: number }[] = []; // Temporary array to store objects with tokenType and tokenId

    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const nftContractInstnace = new ethers.Contract(
        NFT_Address,
        NFT_ABI,
        signer
      );
      // Fetch token IDs for all types in parallel
      const promises = Object.entries(tokenType).map(async ([key, value]) => {
        if (value > 0) {
          const tokenType = parseInt(key.replace("NFT", ""), 10);

          // Fetch token IDs from the contract
          const getTokenId = await nftContractInstnace.getUserTokens(
            tokenType,
            address
          );

          // Check if the returned data is not empty
          if (getTokenId && getTokenId.length > 0) {
            // Extract token IDs and store them with the tokenType
            const extractedTokenIds = getTokenId.flatMap((innerArray: any) =>
              innerArray.map((bigNumber: any) => ({
                tokenType,
                tokenId: ethers.BigNumber.from(bigNumber).toNumber(),
              }))
            );

            // Add the objects to the array
            updatedTokenIds.push(...extractedTokenIds);
          } else {
            console.warn(`No token IDs found for token type: ${key}`);
          }
        }
      });

      await Promise.all(promises); // Wait for all token types to be fetched

      // After all promises are resolved, update the state once with the complete set of token IDs
      console.log("updated tokens ", updatedTokenIds);
       checkValidRewardNFTs(updatedTokenIds);   
       
    } catch (error) {
      console.error("Error fetching token IDs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserTotalNFTs = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const nftContractInstnace = new ethers.Contract(
        NFT_Address,
        NFT_ABI,
        signer
      );
      const getTotalNFTs = await nftContractInstnace.userMetadata(address);
      const formattedResponse = {
        NFT1: ethers.BigNumber.from(getTotalNFTs.NFT1).toNumber(),
        NFT2: ethers.BigNumber.from(getTotalNFTs.NFT2).toNumber(),
        NFT3: ethers.BigNumber.from(getTotalNFTs.NFT3).toNumber(),
        NFT4: ethers.BigNumber.from(getTotalNFTs.NFT4).toNumber(),
        NFT5: ethers.BigNumber.from(getTotalNFTs.NFT5).toNumber(),
      };

      const newTokenType: { [key: string]: number } = {};
      Object.keys(formattedResponse).forEach((key) => {
        if (formattedResponse[key as keyof typeof formattedResponse] > 0) {
          newTokenType[key] =
            formattedResponse[key as keyof typeof formattedResponse];
        }
      });

      setTokenType(newTokenType);
    } catch (error) {
      console.error("Error fetching user total NFTs:", error);
    }
  };


  

  useEffect(() => {
    console.log("Token Type State: ", tokenType);
    if (Object.keys(tokenType).length > 0) {
      fetchTokenIds().then(() =>
        console.log("Final Token IDs State: ", tokenIds)
      );
    }
  }, [tokenType]);

  useEffect(() => {
    console.log("tokentype state ->>>> ", tokenType);
  }, [tokenType]);

  useEffect(() => {
    getUserTotalNFTs();
  }, []);

  // Ensure the handleNextPage and handlePreviousPage consider the total items
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  // Updated renderTokenIds to handle pagination

  const renderPaginatedTokenIds = () => {
    // Prioritize tokenType 1 first in the array
    const sortedTokenIds = [...tokenIds].sort((a, b) => {
      if (a.tokenType === 1 && b.tokenType !== 1) return -1; // a is tokenType 1, b is not
      if (a.tokenType !== 1 && b.tokenType === 1) return 1; // a is not tokenType 1, b is
      return 0; // Both are the same tokenType or neither is 1, maintain order
    });

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the sortedTokenIds array to get only the tokens for the current page
    const selectedIds = sortedTokenIds.slice(startIndex, endIndex);
    console.log("selectedIds ", selectedIds);

    return selectedIds.map((token, index) => (
      <BouncesContainer
        key={`${startIndex}-${token.tokenId}-${index}`}
        id={token.tokenId}
        tokenId={Number(token.tokenType)}
      />
    ));
  };

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex items-center justify-center translate-y-44">
          <FadeLoader color="#ffd008" />
        </div>
      ) : (
        <>
          {renderPaginatedTokenIds()} {/* Render paginated tokens */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="mx-2 px-4 py-2 bg-yellow-400 rounded disabled:bg-yellow-600"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= tokenIds.length}
              className="mx-2 px-4 py-2 bg-yellow-400 rounded disabled:bg-yellow-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Bounces;
