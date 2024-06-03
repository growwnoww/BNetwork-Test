"use client"
import { ethers } from "ethers";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import USDTToken from "../../../contract/USDTABI.json";
import { FaUserLock } from "react-icons/fa";
import Link from "next/link";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import ClubA_ABI from '../../../contract/ClubAContract/ClubA_ABI.json'
import axios from "axios";
import { clubA_Address } from "@/contract/ClubAContract/ClubA_Instance";
import { WalletContext } from "@/context/WalletContext";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { formatEther } from "ethers/lib/utils";
import { PlanetUpgrade_Address } from "@/contract/Web3_Instance";
import PlanetUpABI from '@/contract/BNetwork_ABI.json'


interface ClubAType {
  key: string;
  PlanetName: string;
  globalCount: number;
}

interface Ethereum {
  isMetaMask?: boolean;
  request?: (...args: any[]) => Promise<void>;
  on?: (...args: any[]) => void;
  // Add other properties and methods that you expect to use
}

declare global {
  interface Window {
      //@ts-ignore
      ethereum?: Ethereum;
  }
}

const ClubAStructure = ({ PlanetName, globalCount }: ClubAType) => {
  
 const { walletProvider } = useWeb3ModalProvider();
 const userAddressLocal = typeof window !== 'undefined' ? localStorage.getItem("userAddress") : null;
 const userAddress = userAddressLocal;
  const walletContext = useContext(WalletContext)
  const {address} = useWeb3ModalAccount()
  
  const [isApprove, setApprove] = useState<boolean>(false);
  const [planetBuy, setPlanetBuy] = useState<boolean>(false);
  const [highestPlanetBought, setHighestPlanetBought] = useState<number>(0);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)
  const [timer, setTimer] = useState<any>(0);
  const [timerDisplay, setTimerDisplay] = useState<string>("");
  const [isApproveRe, setApproveRe] = useState<boolean>(false);
  const [planetBuyRe, setPlanetBuyRe] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();



  const getPlanetId = (planetId: string): number | undefined => {
    const planetNames: { [id: string]: number } = {
      Earth: 1,
      Moon: 2,
      Mars: 3,
      Mercury: 4,
      Venus: 5,
      Jupiter: 6,
      Saturn: 7,
      Uranus: 8,
      Neptune: 9,
      Pluto: 10,
    };

    return planetNames[planetId];
  };

  const getPlanetName = (planetId: number): string | undefined => {
    const planetNames: { [id: number]: string } = {
      1: "Earth 10$",
      2: "Moon 25$",
      3: "Mars 50$",
      4: "Mercury 100$",
      5: "Venus 250$",
      6: "Jupiter 500$",
      7: "Saturn 1000$",
      8: "Uranus 2500$",
      9: "Neptune 5000$",
      10: "Pluto 10000$",
    };

    return planetNames[planetId];
  };

  const postPlanetBuyInfo = async (
    regAddress:string,
    planetId:number,
    transactionHash: string,
   referralAddress:string
  ) => {
    try {
      const planetNameStr = getPlanetName(planetId);
      const planetNameOnly = planetNameStr?.split(" ")[0];
      const planetPack = planetNameStr?.split(" ")[1];
      console.log("Planet package ", planetPack);

      const payload = {
        regAddress:regAddress,
        planetId: planetId,
        planetName: planetNameOnly,
        planetPackage: planetPack,
        universeCount:1,
        transactionHash: transactionHash,
        referralAddress:String(referralAddress).toLowerCase()
       
      };

      console.log("payload", payload);


      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/clubA/buyPlanetClubA`,payload)

      if (response.status == 201) {
       console.log("user planet buy successfully in clubA",response.status)
      }
      else{
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.log("Something went wrong in buyPlanet", error);
    }
  };






  const getCurrentPlanetStatus = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
      const clubACont = clubAMainContract;
      console.log("club A ",clubACont)
      const isUserExist = await clubACont!.UserRegister(userAddress);

      if (!isUserExist) {
        setHighestPlanetBought(0);
        return;
      }

      const currentPlanet = await clubACont!.getPackage(userAddress);
      console.log("currentpLnaet", currentPlanet);

      if (typeof currentPlanet === "undefined") {
        throw new Error("Unable to retrieve current planet.");
      }

      let planetBoughtNumber = ethers.BigNumber.from(currentPlanet).toNumber();
      console.log("planetBoughtNumber", planetBoughtNumber);

      setHighestPlanetBought(planetBoughtNumber);
      return getPlanetName(planetBoughtNumber);
    } catch (error) {
      console.log("something went wrong in getCurrentPlanetStatus", error);
      throw error; // Propagate the error
    }
  };

  const approveUSDT = async () => {
    try {
      alert(
        "🚸The USDT approval amount must be equal to or greater than the planet purchase amount. Otherwise, your transaction will fail, and you will lose your gas fee. ⚠"
      );

      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);;
      const getFeeTokenAddress = await clubAMainContract!.getFeeToken();
      console.log("USDT TOken address", getFeeTokenAddress);
      const secondInstance = new ethers.Contract(
        getFeeTokenAddress,
        USDTToken,
        signer
      );
      const approveAmt = await secondInstance.balanceOf(userAddress);
      console.log("Approve", approveAmt);
      const approve = await secondInstance.approve(
        clubAMainContract!.address,
        approveAmt
      );
      await approve.wait();
      console.log(approve);
      setApprove(true);
      setIsButtonVisible(false);
    } catch (error) {
      console.log(error);
    }
  };



  const getUpline = async (userAdr:string) =>{
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const planetUpSC = new ethers.Contract(PlanetUpgrade_Address,PlanetUpABI , signer);
      const myContract = planetUpSC;
      

      const uplineAddress = await myContract!.RegisterUserDetails(userAdr);


      const formattedResponse = {
        upline: uplineAddress.regReferal,
      };

      console.log("formatted response",formattedResponse.upline)
      let uplineAdr = formattedResponse.upline;

      return uplineAdr;

    } catch (error) {
      console.log("something went wrong in getUpline",error)
    }

  }

  const isGenerationHasSpace = async (uplineAdr:string) =>{
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
  
      const uplineInfo = await clubAMainContract.InternalGenStr(uplineAdr);
  
      const formattedResponse = {
        leftAdr: uplineInfo.left,
        middleAdr: uplineInfo.middle,
        rightAdr: uplineInfo.right,
        leftid: ethers.BigNumber.from(uplineInfo.leftid).toNumber(),
        middleid: ethers.BigNumber.from(uplineInfo.middleid).toNumber(),
        rightid: ethers.BigNumber.from(uplineInfo.rightid).toNumber(),
      };
  
      const hasSpace = (
        formattedResponse.leftid === 0 ||
        formattedResponse.middleid === 0 ||
        formattedResponse.rightid === 0
      );
  
      return {
        hasSpace,
        leftAdr: formattedResponse.leftAdr,
        middleAdr: formattedResponse.middleAdr,
        rightAdr: formattedResponse.rightAdr,
      };
    } catch (error) {
      console.error('Something went wrong in isGenerationHasSpace:', error);
      // Return a default object in case of an error, indicating there's no space
      return {
        hasSpace: false,
        leftAdr: null,
        middleAdr: null,
        rightAdr: null,
      };
    }
  }



  const findSpace = async (startAddress: any) => {
    const queue = [startAddress]; // Initialize a queue with the starting address
  
    while (queue.length > 0) {
      // Dequeue the first item
      const currentAddress = queue.shift();
  
      // Check if the current node has space
      const data = await isGenerationHasSpace(currentAddress);
  
      // If it has space, return the current address
      if (data.hasSpace) {
        return currentAddress;
      }
  
      // If no space, add the child nodes to the queue (left, middle, right)
      const { leftAdr, middleAdr, rightAdr } = data;
  
      if (leftAdr) {
        queue.push(leftAdr);
      }
      if (middleAdr) {
        queue.push(middleAdr);
      }
      if (rightAdr) {
        queue.push(rightAdr);
      }
    }
  
    // If no space found, return null
    return null;
  };


  const findUpline = async (referralAddress: string): Promise<string | undefined> => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
      
      console.log("referral address", referralAddress);
      const data = await clubAMainContract!.GetGenerationDirectSponser(referralAddress);
      let sponserAddress = data[0];
      let hasBoughtPlanet = data[1];
      
      console.log("has boughtplanet", hasBoughtPlanet);
  
      if (sponserAddress === "0x241B51ad84b5a38695dC5204cA38D00Aee1D1817" || hasBoughtPlanet) {
        console.log("sponser address", sponserAddress);
        return sponserAddress;
      } else {
        return await findUpline(sponserAddress);
      }
    } catch (error) {
      console.log("something went wrong in findUpline address", error);
      return undefined;
    }
  };

  const fetchEventDataFromTransaction = async (transactionHash:any) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      const receipt = await provider.getTransactionReceipt(transactionHash);
      console.log("receipt ",receipt)
      let receiverAddress = ""
  
      if (receipt && receipt.logs) {
        const iface = new ethers.utils.Interface(ClubA_ABI);
  
        receipt.logs.forEach((log) => {
          try {
            const parsedLog = iface.parseLog(log);
            if (parsedLog.name === 'WorkingGenerationDist') {
              console.log('WorkingGenerationDist Event data:', parsedLog.args);
              receiverAddress = parsedLog.args.to;
            } else if (parsedLog.name === 'WorkingGenerationEnergyDist') {
              console.log('WorkingGenerationEnergyDist Event data:', parsedLog.args);
            }

          } catch (error) {
            // Log might not belong to the contract or could not be parsed, ignore it
          }
        });
      }

      console.log("to address",receiverAddress)

      return receiverAddress;
    } catch (error) {
      console.error('Error fetching event data from transaction:', error);
    }
  };
  


  const buyPlanetUser = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
  
      const planetById =
        PlanetName === "Earth"
          ? "1"
          : PlanetName === "Moon"
          ? "2"
          : PlanetName === "Mars"
          ? "3"
          : PlanetName === "Mercury"
          ? "4"
          : PlanetName === "Venus"
          ? "5"
          : PlanetName === "Jupiter"
          ? "6"
          : PlanetName === "Saturn"
          ? "7"
          : PlanetName === "Uranus"
          ? "8"
          : PlanetName === "Neptune"
          ? "9"
          : PlanetName === "Pluto"
          ? "10"
          : "null";
  


      //we have to check wheather upline has bought planet or not
      const isPlanetBuyBySponsor = await clubAMainContract!.GetGenerationDirectSponser(userAddress);

      let directSponser = isPlanetBuyBySponsor[0];
      console.log("first direct sponser",directSponser)
      const isBuy = isPlanetBuyBySponsor[1];

      let referrerAddress;

      if(!isBuy){
      console.log("is buy false",isBuy)
        
       //find new upline for this user
       referrerAddress =  await findUpline(directSponser)
       console.log("from findUpline function i got this referrer address",referrerAddress)
      }
      else{
        referrerAddress = directSponser;
      }


      console.log("is GetGenerationDirectSponsor",isPlanetBuyBySponsor[1])
      
  
      let buyPlanet;
  
      if (planetById === "1") {
        // Find a space in the hierarchy
        const spaceAddress = await findSpace(referrerAddress);
        console.log("space address",spaceAddress)
  
        if (spaceAddress) {
          console.log("space address",spaceAddress)
          buyPlanet = await clubAMainContract!.buyPlannet_FirstPackage(spaceAddress);
        } else {
          throw new Error("No space available for new registration.");
        }
      } else {
        buyPlanet = await clubAMainContract!.buyPlannet(); // For other packages
      }
  
      await buyPlanet.wait();
      const transactionReceipt = buyPlanet.hash;
      const transactionHash = transactionReceipt;

      setPlanetBuy(true);
      setIsButtonVisible(false);
  
       referrerAddress = await fetchEventDataFromTransaction(transactionHash);

      postPlanetBuyInfo(userAddress!,Number(planetById),transactionReceipt,referrerAddress!)
  
  
      alert(`Planet Buy Successfully! 🚀 To See Changes On Website. Don't Refresh Screen.`);
    } catch (error) {
      console.error("Error in buyPlanetUser:", error);
    }
  };


  
 



  const handleCloseModal = () => {
    // Function to close the modal
    setIsModalVisible(false);
    setPlanetBuy(false); // Reset planetBuy if needed
   };



  useEffect(() => {
    getCurrentPlanetStatus();
    setIsButtonVisible(true);
    setIsModalVisible(true);

  }, [highestPlanetBought, planetBuy]);


  

  return (
    <div
      key={highestPlanetBought}
      className="w-full  relative "
      id={PlanetName}
    >
      <svg
        width="100%"
        viewBox="0 90 380 228"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect
          width="776"
          height="776"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 -188.021)"
          fill="#1A1A1A"
        />
        <circle
          r="97"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.953)"
          stroke="#4D4D4D"
          strokeLinejoin="round"
        />
        <circle
          r="155.2"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.952)"
          stroke="#333333"
          strokeLinejoin="round"
        />
        <circle
          r="213.4"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.952)"
          stroke="#333333"
          strokeLinejoin="round"
        />
        <circle
          r="271.6"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.951)"
          stroke="#333333"
          strokeLinejoin="round"
        />
        <circle
          r="329.8"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 187.081 199.952)"
          stroke="#333333"
          strokeLinejoin="round"
        />
        <path
          d="M271.087 151.456C285.684 159.883 296.226 170.36 301.673 181.855C307.12 193.35 307.285 205.466 302.151 217.009C297.017 228.552 286.762 239.124 272.396 247.682C258.03 256.24 240.049 262.489 220.226 265.814L204.488 234.543C214.9 232.797 224.343 229.515 231.888 225.02C239.433 220.525 244.819 214.973 247.516 208.911C250.212 202.848 250.125 196.485 247.264 190.448C244.403 184.411 238.867 178.908 231.201 174.482L271.087 151.456Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          d="M217.829 266.201C197.889 269.285 176.901 269.317 156.933 266.293C136.966 263.268 118.708 257.293 103.959 248.955C89.2095 240.617 78.4784 230.204 72.823 218.742C67.1675 207.281 66.7829 195.166 71.707 183.593L126.486 191.361C123.9 197.439 124.102 203.801 127.072 209.821C130.043 215.84 135.679 221.309 143.425 225.689C151.171 230.068 160.76 233.206 171.247 234.794C181.734 236.383 192.757 236.366 203.23 234.746L217.829 266.201Z"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          d="M72.3258 182.202C77.6687 170.69 88.1151 160.181 102.636 151.71C117.156 143.24 135.249 137.099 155.132 133.894C175.015 130.689 196.001 130.531 216.023 133.434C236.044 136.337 254.41 142.202 269.309 150.451L230.267 173.954C222.442 169.622 212.796 166.542 202.281 165.017C191.766 163.492 180.744 163.576 170.301 165.259C159.859 166.942 150.356 170.167 142.73 174.616C135.104 179.065 129.617 184.584 126.811 190.63L72.3258 182.202Z"
          fill="white"
          fillOpacity="0.1"
        />
        <circle
          r="30.1"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 214.383 266.637)"
          fill="#1F1F1F"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle
          r="30.1"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 71.5718 184.192)"
          fill="#1F1F1F"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle
          r="30.1"
          transform="matrix(0.866044 0.499967 -0.866044 0.499967 271.087 151.457)"
          fill="#1F1F1F"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <Link href={`/dashboard/bnsystem/universeclub-a/${PlanetName}`}>
      <div className="absolute top-[29%] md:top-[25%]  right-[40%] md:right-[38%] ">
        <Image
          src="/Yellow.png"
          alt="'/Yellow.png',"
          loading="lazy"
          height={70}
          width={70}

        />
      </div>
      </Link>

      <div className="absolute top-[15%] right-[23%]">
        {globalCount === 1 || globalCount === 2 || globalCount === 3 ? (
          <Image
            src="/Orange.png"
            alt="/Orange.png"
            loading="lazy"
            height={40}
            width={40}
          />
        ) : (
          <Image
            src="/Silver.png"
            alt="/Silver.png"
            loading="lazy"
            height={40}
            width={40}
          />
        )}
      </div>

      <div className="absolute top-[30%] left-[13%]">
        {globalCount === 2 || globalCount === 3 ? (
          <Image
            src="/Orange.png"
            alt="/Orange.png"
            loading="lazy"
            height={40}
            width={40}
          />
        ) : (
          <Image
            src="/Silver.png"
            alt="/Silver.png"
            loading="lazy"
            height={40}
            width={40}
          />
        )}
      </div>

      <div className="absolute bottom-[12%] right-[37%]">
      {globalCount === 3 ? (
          <Image
            src='/Orange.png'
            alt='/Orange.png'
            loading='lazy'
            height={40}
            width={40}
          />
        ) : (
          <Image
            src='/Silver.png'
            alt='/Silver.png'
            loading='lazy'
            height={40}
            width={40}
          />
        )}
      </div>

      <div className="z-10 absolute top-[23%] right-[44%] flex flex-col items-center text-xl font-semibold">
        {getPlanetId(PlanetName)! <= highestPlanetBought ? (
          ""
        ) : getPlanetId(PlanetName) === highestPlanetBought + 1 ? (
          isApprove ? (
            planetBuy ? (
              ""
            ) : (
              !isButtonVisible && ( // Check if the button should be visible
                <button
                  className="bg-blue-500 py-1 px-5 translate-x-10 mt-5 rounded-md hover:bg-blue-600 duration-300"
                  onClick={() => {
                    buyPlanetUser();
                  }}
                >
                  Upgrade
                </button>
              )
            )
          ) : (
            isButtonVisible && ( // Check if the button should be visible
              <button
                className="bg-yellow-500 py-1 px-5 translate-x-10 mt-5 rounded-md hover:bg-yellow-600 duration-300"
                onClick={() => {
                  approveUSDT();
                }}
              >
                Approve
              </button>
            )
          )
        ) : (
          <span className="text-5xl mt-4">
            <FaUserLock className="text-white" />
          </span>
        )}
      </div>

      { 
         getPlanetId(PlanetName)! <= highestPlanetBought?(timerDisplay === "00:00:00" ? (
          isApproveRe?(<button className="absolute top-[105%] left-[10%] bg-blue-500 py-0.5 w-3/4 mx-1 rounded-lg"  >
          Re-Purchase
        </button>):( <button className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg" onClick={() => {

         }}>
          Approve
        </button>)
   ) : (
     ''
   )):('')



       }


      

    </div> )}

export default ClubAStructure
