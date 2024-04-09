"use client"
import { clubAContract } from "@/contract/ClubAContract/ClubA_Instance";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import USDTToken from "../../../contract/USDTABI.json";
import { FaUserLock } from "react-icons/fa";
import Link from "next/link";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import ClubA_ABI from '../../../contract/ClubAContract/ClubA_ABI.json'
import { useAccount } from "wagmi";
import axios from "axios";


interface ClubAType {
  key: string;
  PlanetName: string;
  globalCount: number;
}

const ClubAStructure = ({ PlanetName, globalCount }: ClubAType) => {
  
 const { walletProvider } = useWeb3ModalProvider();
  const {address} = useWeb3ModalAccount()
  const userAddress = address;
  const [isApprove, setApprove] = useState<boolean>(false);
  const [planetBuy, setPlanetBuy] = useState<boolean>(false);
  const [highestPlanetBought, setHighestPlanetBought] = useState<number>(0);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)
  const [timer, setTimer] = useState<any>(0);
  const [timerDisplay, setTimerDisplay] = useState<string>("");
  const [isApproveRe, setApproveRe] = useState<boolean>(false);
  const [planetBuyRe, setPlanetBuyRe] = useState<boolean>(false);


 const clubA_Address = "0x56426Bb7749e6d07861eF7289f5F74E51028A4eF";

 
  
  const getUserPlanetBuyTime = async (planetName:string) =>{
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
      const clubACont = clubAMainContract;
     const planetId = getPlanetId(planetName)
     const lastPlanetBuyTime = await clubACont!.getLastJoinTime(userAddress,planetId);
     console.log("lastPlanetBuyTime",lastPlanetBuyTime)
     const lastPlanetBuyTimeInNumber =  ethers.BigNumber.from(lastPlanetBuyTime).toNumber();
     console.log("lastPlanetBuyTimeInNumber",lastPlanetBuyTimeInNumber)
 
     return lastPlanetBuyTimeInNumber;
    } catch (error) {
     
    }
   }

 const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 300);
  const minutes = Math.floor((timeInSeconds % 300) / 60);
  const seconds = timeInSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
 };


const getUserPlanetBuyTimeDiff = async () => {
  try {
  
    const lastPlanetBuyTime = await getUserPlanetBuyTime(PlanetName);
    console.log("lastPlanetBuyTime", lastPlanetBuyTime);


    const currentTime = Math.floor(Date.now() / 1000); 


    const timeDiffSeconds = currentTime - lastPlanetBuyTime!;
    console.log("planet name",PlanetName,"time diff",timeDiffSeconds)
    

    if (timeDiffSeconds < 300) {
      setTimer(300 - timeDiffSeconds);

    
    } else {
 
      setTimer(0);
      console.log("Time expired!");
    }
  } catch (error) {
    console.error("Error fetching last planet buy time:", error);
  }
};

useEffect(() => {
  
  getUserPlanetBuyTimeDiff();

  const intervalId = setInterval(() => {
    setTimer((prevTimer:any) => {
      if (prevTimer > 0) {
        return prevTimer - 1;
      } else {
        clearInterval(intervalId); 
        return 0;
      }
    });
  }, 1000);

 
  return () => clearInterval(intervalId);
}, [timer]);

useEffect(() => {

  setTimerDisplay(formatTime(timer));
}, [timer]);





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
      1: "Earth 0.1$",
      2: "Moon 0.2$",
      3: "Mars 0.3$",
      4: "Mercury 0.4$",
      5: "Venus 0.5$",
      6: "Jupiter 0.6$",
      7: "Saturn 0.7$",
      8: "Uranus 0.8$",
      9: "Neptune 0.9$",
      10: "Pluto 1$",
    };

    return planetNames[planetId];
  };

  const postPlanetBuyInfo = async (
    regAddress:string,
    planetId:number,
    transactionHash: string,
    repurchaseCount:number
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
        transactionHash: transactionHash,
        repurchaseCount:repurchaseCount
      };

      console.log("payload", payload);


      const response = await axios.post( `${process.env.NEXT_PUBLIC_URL}/clubA/buyPlanetClubA`,payload)

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



  const getPlanetDataSC = async (user: string, planetId: number,transactionHash:string) => {
    try {
        const provider = new ethers.providers.Web3Provider(walletProvider as any);
        const signer = provider.getSigner();
        const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
        const myContract = clubAMainContract;
        const repurchaseCountRaw = await myContract!.GetrepuchaseCounter(planetId,user);
        const repurchaseCount = ethers.BigNumber.from(repurchaseCountRaw).toNumber();
        console.log("repurchase count",repurchaseCount)
        
        postPlanetBuyInfo(user,planetId,transactionHash,repurchaseCount);
              
    } catch (error) {
        console.log("Something went wrong in getPlanetDataSC", error);
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

  const approveUSDTRe = async () => {
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
      setApproveRe(true);
      setIsButtonVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const buyPlanetUser = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
      const myContract = clubAMainContract;
      const getGasPrice = signer.getGasPrice()

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
      console.log(planetById);
      const buyPlanet = await myContract!.buyPlannet(); // No arguments passed

      await buyPlanet.wait();
      console.log(buyPlanet);
      const transactionHash = buyPlanet.hash;

      console.log(`Transaction hash: ${transactionHash}`);
      // getPlanet(planetId,transactionHash);
      setPlanetBuy(true);
      setIsButtonVisible(false);

       getPlanetDataSC(userAddress?.toLowerCase()!,Number(planetById),transactionHash)
      // postPlanetBuyInfo(userAddress?.toLowerCase()!,Number(planetById),transactionHash)
      alert(
        `Planet Buy Successfully! 🚀 To See Changes On Website. Please The refersh the page.`
      );
      // setPlanetBuyStatus((prevStatus) => ({ ...prevStatus, [planetId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  const buyPlanetUserRe = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
      const myContract = clubAMainContract;

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
      console.log(planetById);
      const buyPlanet = await myContract!.rePurchasePackage(planetById,userAddress); // No arguments passed

      await buyPlanet.wait();
      console.log(buyPlanet);
      const transactionHash = buyPlanet.hash;

      console.log(`Transaction hash: ${transactionHash}`);
      // getPlanet(planetId,transactionHash);
      setPlanetBuyRe(true);
      setIsButtonVisible(false);
      getPlanetDataSC(userAddress?.toLowerCase()!,Number(planetById),transactionHash)
      // postPlanetBuyInfo(userAddress?.toLowerCase()!,Number(planetById),transactionHash)
      alert(
        `Planet Buy Successfully! 🚀 To See Changes On Website. Please The refersh the page.`
      );
      // setPlanetBuyStatus((prevStatus) => ({ ...prevStatus, [planetId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentPlanetStatus();
    setIsButtonVisible(true);
    getUserPlanetBuyTime(PlanetName)

  }, [highestPlanetBought, planetBuy]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    // Watch for changes in planetBuy or planetBuyRe
    if (planetBuy || planetBuyRe) {
      // Set a timeout to refresh the page after 4-5 seconds
      timer = setTimeout(() => {
        window.location.reload();
      }, 10000); // Adjust the delay as needed
    }
  
    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [planetBuy, planetBuyRe]);
  

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
                  className="bg-yellow-500 py-1 px-5 translate-x-10 mt-5 rounded-md hover:bg-yellow-600 duration-300"
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
          isApproveRe?(<button className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg" onClick={()=>{buyPlanetUserRe()}} >
          Re-Upgrade
        </button>):( <button className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg" onClick={() => {
           approveUSDTRe();
         }}>
          Approve
        </button>)
   ) : (
     <button className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg">
       Repurchase In: {timerDisplay}
     </button>
   )):('')



       }
      

    </div> )}

export default ClubAStructure
