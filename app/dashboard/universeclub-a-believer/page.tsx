"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { bNetwork } from "@/contract/Web3_Instance";
import { ethers } from "ethers";
import { Context } from "@/components/Context";
import Token_ABI from "@/contract/Token_ABI.json";
import { SelectData } from "@/utils/SelectData";
import { WalletContext } from "@/context/WalletContext";
import { useAccount } from "wagmi";
import axios from "axios";
import USDTToken from "../../../contract/USDTABI.json";

import { clubAContract } from "@/contract/ClubAContract/ClubA_Instance";
import { ClubAPlanetPackage } from "@/utils/ClubAPlanetPackageData";

interface userDetailsType {
  regUser: string;
  regTime: string;
  regId: number;
  regReferal: string;
  regReferalId: number;
  teamCount: number;
  reg_transaction_hash?: string;
  highestPlanetCount: number;
}

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Buy Planet");
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const [isApprove, setApprove] = useState<boolean>(false);
  const [isApproveRe, setApproveRe] = useState<boolean>(false);
  const [planetBuyRe, setPlanetBuyRe] = useState<boolean>(false);
  const [allow, setAllow] = useState<string>("");
  const [value, setValue] = useState<any>({
    yourAddress: "",
    beliverAddress: "",
    PlanetName: "Earth",
  });
  const [userDetails, setUserDetails] = useState<userDetailsType>();
  const { isConnected } = useAccount();
  const [tranxHashhh, setTranxHash] = useState("");
  const [curretnPlanetBeliever, setCurrentPlanetBeliever] = useState("");

  const [timer, setTimer] = useState<any>(0);
  const [timerDisplay, setTimerDisplay] = useState<string>("");

  const getUserPlanetBuyTime = async (planetName: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const clubACont = clubAContract();
      const planetId = getPlanetId(planetName);
      const lastPlanetBuyTime = await clubACont!.getLastJoinTime(
        value.beliverAddress,
        planetId
      );
      console.log("lastPlanetBuyTime", lastPlanetBuyTime);
      const lastPlanetBuyTimeInNumber =
        ethers.BigNumber.from(lastPlanetBuyTime).toNumber();
      console.log("lastPlanetBuyTimeInNumber", lastPlanetBuyTimeInNumber);

      return lastPlanetBuyTimeInNumber;
    } catch (error) {}
  };

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const getUserPlanetBuyTimeDiff = async () => {
    try {
      const lastPlanetBuyTime = await getUserPlanetBuyTime(value.PlanetName);
      console.log("lastPlanetBuyTime", lastPlanetBuyTime);

      const currentTime = Math.floor(Date.now() / 1000);

      const timeDiffSeconds = currentTime - lastPlanetBuyTime!;
      console.log(
        "planet name",
        value.PlanetName,
        "time diff",
        timeDiffSeconds
      );

      if (timeDiffSeconds < 3600) {
        setTimer(3600 - timeDiffSeconds);
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
      setTimer((prevTimer: any) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer,value]);

  useEffect(() => {
    setTimerDisplay(formatTime(timer));
  }, [timer,value]);

  console.log(value);

  const handleSelectPackageChange = (selectedValue: string) => {
    setValue((prevState: any) => ({
      ...prevState,
      PlanetName: selectedValue,
    }));
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const getPlanetId = (planetName: string): number => {
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

    return planetNames[planetName];
  };

  const getUserDetail = async (tranxHash: string) => {
    try {
      if (!userAddress || !isConnected) {
        return;
      }

      const MyContract = bNetwork();

      const exists = await MyContract!.isUserExists(value.beliverAddress);

      if (exists) {
        const response = await MyContract!.RegisterUserDetails(
          value.beliverAddress
        );
        console.log("Believer address", value.beliverAddress);
        const highestPlanetCount = await MyContract!.UserPlannet(
          value.beliverAddress
        );
        console.log("Believer address", value.beliverAddress);
        console.log("Got user details", response);

        const formattedResponse: userDetailsType = {
          regUser: String(response.regUser).toLowerCase(),
          regTime: ethers.BigNumber.from(response.regTime).toString(), // or .toNumber() if safe
          regId: ethers.BigNumber.from(response.regId).toNumber(),
          regReferal: String(response.regReferal).toLowerCase(),
          regReferalId: ethers.BigNumber.from(response.regReferalId).toNumber(), // Assuming this is already a number
          teamCount: ethers.BigNumber.from(response.teamCount).toNumber(),
          highestPlanetCount:
            ethers.BigNumber.from(highestPlanetCount).toNumber(),
        };

        setTranxHash(tranxHash);
        setUserDetails(formattedResponse);

        console.log("Refined Data", formattedResponse);
      }
    } catch (error) {
      console.log("Something wrong in userDetailsFUnc", error);
    }
  };

  const createUser = async (tranxHash: string) => {
    try {
      console.log("reg user", userDetails?.regUser);
      const owner = "0xf346c0856df3e220e57293a0cf125c1322cfd778";
      let uplineAddrLocal = "";
      let uplineBNIdLocal = "";

      // Use userDetails directly now, assuming it has been set by this point
      if (
        userDetails?.regReferal ===
          "0x0000000000000000000000000000000000000000" ||
        !userDetails?.regReferalId
      ) {
        uplineAddrLocal = owner;
        uplineBNIdLocal = "BN" + owner.substring(owner.length - 8);
      } else {
        uplineAddrLocal = userDetails.regReferal;
        uplineBNIdLocal =
          "BN" +
          userDetails.regReferal.substring(userDetails.regReferal.length - 8);
      }

      const payload = {
        reg_user_address: userDetails?.regUser,
        reg_time: userDetails?.regTime,
        regId: userDetails?.regId,
        upline_referral_address: uplineAddrLocal,
        upline_referralId: userDetails?.regReferalId,
        upline_referral_BNId: uplineBNIdLocal,
        direct_count: userDetails?.teamCount,
        reg_transaction_hash: tranxHash,
      };

      console.log("hellow", payload);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/user/createUserDetails`,
        payload
      );

      if (res.data) {
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error in createRegister:", error);
    }
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
    PlanetName:string,
    transactionHash: string,
  ) => {
    try {
      const planetId = getPlanetId(PlanetName)
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
      };

      console.log("payload", payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/clubA/buyPlanetClubA`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("Something went wrong in buyPlanet", error);
    }
  };
  const checkCurrentPlanet = async () => {
    try {
      const myContract = clubAContract();
      const currentPlanetStatus = await myContract!.getPackage(
        value.beliverAddress
      );
      const currentPlanetId =
        ethers.BigNumber.from(currentPlanetStatus).toNumber();

      if (currentPlanetId === 0) {
        setCurrentPlanetBeliever("No Planet");
        return;
      }
      const planetName = getPlanetName(currentPlanetId);
      setCurrentPlanetBeliever(planetName!);
    } catch (error) {
      console.log("something went wrong in checkCurrentPlanet", error);
    }
  };

  const approveUSDT = async () => {
    try {
      alert(
        "🚸The USDT approval amount must be equal to or greater than the planet purchase amount. Otherwise, your transaction will fail, and you will lose your gas fee. ⚠"
      );

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const clubACont = clubAContract();
      const getFeeTokenAddress = await clubACont!.getFeeToken();
      console.log("USDT TOken address", getFeeTokenAddress);
      const secondInstance = new ethers.Contract(
        getFeeTokenAddress,
        USDTToken,
        signer
      );
      const approveAmt = await secondInstance.balanceOf(userAddress);
      console.log("Approve", approveAmt);
      const approve = await secondInstance.approve(
        clubACont!.address,
        approveAmt
      );
      await approve.wait();
      console.log(approve);
      setApprove(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkApproveUSDT = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const myContract = bNetwork();

      const gasPrice = await signer.getGasPrice();

      const getFeeTokenAddress = await myContract!.getFeeToken();
      const secondInstance = new ethers.Contract(
        getFeeTokenAddress,
        Token_ABI,
        signer
      );
      const checkAllowance = await secondInstance.allowance(
        userAddress,
        myContract!.address
      );
      const allowance = Number(checkAllowance?._hex);
      setAllow(allowance.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCurrentPlanet = async (regAddress:any)=>{
     try {
      const clubACont = clubAContract();
      const planetId = await clubACont!.getPackage(regAddress)
      const lastPlanetBuyTimeInNumber =
        ethers.BigNumber.from(planetId).toNumber();
      console.log("lastPlanetBuyTimeInNumber", lastPlanetBuyTimeInNumber);

      if(lastPlanetBuyTimeInNumber === 0){
        return "Earth";
      }
      
      const planetName = getPlanetName(lastPlanetBuyTimeInNumber)
      const planetNameonly = planetName!.split(" ")[0];

      return planetNameonly;
     } catch (error) {
      
     }
  }

  const buyPlanetUser = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gasPrice = await signer.getGasPrice();

      const myContract = clubAContract();

      const buyPlanet = await myContract!.buyPlannet_user(value.beliverAddress); // No arguments passed

      await buyPlanet.wait();
      console.log(buyPlanet);
      const transactionHash = buyPlanet.hash;

      console.log(`Transaction hash: ${transactionHash}`);
      // getPlanet(planetId,transactionHash);
      const planetName = await getUserCurrentPlanet(userAddress);
      console.log("currentplanet ", planetName)
      postPlanetBuyInfo(userAddress?.toLowerCase()!,planetName!,transactionHash)
    
      
      
      alert(
        `Planet Buy Successfully! 🚀 To See Changes On Website. Please The refersh the page.`
      );

      
      // setPlanetBuyStatus((prevStatus) => ({ ...prevStatus, [planetId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  const approveUSDTRe = async () => {
    try {
      alert(
        "🚸The USDT approval amount must be equal to or greater than the planet purchase amount. Otherwise, your transaction will fail, and you will lose your gas fee. ⚠"
      );

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const clubACont = clubAContract();
      const getFeeTokenAddress = await clubACont!.getFeeToken();
      console.log("USDT TOken address", getFeeTokenAddress);
      const secondInstance = new ethers.Contract(
        getFeeTokenAddress,
        USDTToken,
        signer
      );
      const approveAmt = await secondInstance.balanceOf(userAddress);
      console.log("Approve", approveAmt);
      const approve = await secondInstance.approve(
        clubACont!.address,
        approveAmt
      );
      await approve.wait();
      console.log(approve);
      setApproveRe(true);
    } catch (error) {
      console.log(error);
    }
  };

  const buyPlanetUserRe = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gasPrice = await signer.getGasPrice();

      const myContract = clubAContract();

      const planetById =
        value.PlanetName === "Earth"
          ? "1"
          : value.PlanetName === "Moon"
          ? "2"
          : value.PlanetName === "Mars"
          ? "3"
          : value.PlanetName === "Mercury"
          ? "4"
          : value.PlanetName === "Venus"
          ? "5"
          : value.PlanetName === "Jupiter"
          ? "6"
          : value.PlanetName === "Saturn"
          ? "7"
          : value.PlanetName === "Uranus"
          ? "8"
          : value.PlanetName === "Neptune"
          ? "9"
          : value.PlanetName === "Pluto"
          ? "10"
          : "null";
      console.log(planetById);
      const buyPlanet = await myContract!.rePurchasePackage(
        planetById,
        value.beliverAddress
      ); // No arguments passed

      await buyPlanet.wait();
      console.log(buyPlanet);
      const transactionHash = buyPlanet.hash;

      console.log(`Transaction hash: ${transactionHash}`);
      // getPlanet(planetId,transactionHash);
      setPlanetBuyRe(true);

      postPlanetBuyInfo(userAddress?.toLowerCase()!,value.PlanetName,transactionHash)
      alert(
        `Planet Buy Successfully! 🚀 To See Changes On Website. Please The refersh the page.`
      );
      // setPlanetBuyStatus((prevStatus) => ({ ...prevStatus, [planetId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkApproveUSDT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setApproveRe(false);
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center ">
        <p className="text-2xl my-5 w-fit font-semibold border-b-4 border-b-yellow-500">
          Create New Believer
        </p>
      </div>

      <div className="w-full h-full items-center justify-center flex flex-col my-4  ">
        <div className="w-fit  flex flex-col  ">
          <div className="flex items-center justify-center">
            <div className="my-3">
              {["Buy Planet", "Re-Purchase"].map((option) => (
                <Button
                  key={option}
                  className={classNames(
                    "text-md mx-4  py-2 px-6 rounded-md transition-all duration-300",
                    {
                      "bg-yellow-500 hover:bg-yellow-700 text-white":
                        selectedOption === option,
                      "bg-zinc-800 text-gray-300": selectedOption !== option,
                    }
                  )}
                  onClick={() => handleOptionChange(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            {selectedOption === "Buy Planet" ? (
              <form
                action=""
                className="w-[90%] md:w-[100%] flex flex-col items-start  gap-y-5 px-4  bg-zinc-900 py-4 lg:px-6 rounded-lg "
                onSubmit={(e) => {
                  e.preventDefault();
                  buyPlanetUser();
                }}
              >
                <label htmlFor="">Your Address</label>
                <Input
                  type="text"
                  placeholder="Enter your address"
                  className="w-60 md:w-96 text-xs md:text-md"
                  value={userAddress || value?.yourAddress}
                  onChange={(e) =>
                    setValue({ ...value, yourAddress: e.target.value })
                  }
                />

                <label htmlFor=""> Believer Address</label>
                <Input
                  type="text"
                  placeholder="Enter new believer address"
                  value={value.beliverAddress}
                  className="w-60 md:w-96 text-xs md:text-md"
                  onChange={(e) =>
                    setValue({ ...value, beliverAddress: e.target.value })
                  }
                />
                <div className="flex items-center justify-between gap-x-7">
                  <div>
                    <Button
                      variant="custom_yellow"
                      type="button"
                      onClick={checkCurrentPlanet}
                    >
                      Check Believer Current Planet
                    </Button>
                  </div>
                  <div>{curretnPlanetBeliever}</div>
                </div>

                <div className="w-full flex items-center justify-center">
                  {isApprove ? (
                    <Button
                      type="submit"
                      variant="custom_yellow"
                      className="w-fit px-6"
                    >
                      Submit
                    </Button>
                  ) : (
                    <div className="w-full flex items-center justify-center my-4">
                      <Button
                        variant="custom_yellow"
                        type="button"
                        onClick={approveUSDT}
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <div className="w-[90%] md:w-ful flex flex-col items-center px-4 gap-y-5 bg-zinc-900  rounded-lg">
                <form
                  action=""
                  className="relative flex flex-col gap-y-5 py-4 px-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    buyPlanetUserRe();
                  }}
                >
                  <label htmlFor="">Your Address</label>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    className="w-60 md:w-96 text-xs md:text-md"
                    value={userAddress || value?.yourAddress}
                    onChange={(e) =>
                      setValue({ ...value, yourAddress: e.target.value })
                    }
                  />
                  <label htmlFor="">Believer Address</label>
                  <Input
                    type="text"
                    placeholder="Enter  believer address"
                    value={value.beliverAddress}
                    className="w-60 md:w-96 text-xs md:text-md"
                    onChange={(e) =>
                      setValue({ ...value, beliverAddress: e.target.value })
                    }
                  />
                  <label>Select Planet Package</label>
                  <Select
                    name="selectedPackage"
                    value={value.PlanetName}
                    onValueChange={handleSelectPackageChange}
                  >
                    <SelectTrigger className="w-[180px] border border-yellow-400">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {ClubAPlanetPackage.map((item) => (
                        <SelectItem key={item.id} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="py-8 relative ">
                  <div className="absolute top-[50%]  w-full flex items-center justify-center">
                    {timerDisplay === "00:00:00" ? (
                      isApproveRe ? (
                        <button
                          className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg"
                          type="submit"
                       
                        >
                          Re-Upgrade
                        </button>
                      ) : (
                        <button
                          className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg"
                          type="button"
                          onClick={() => {
                            approveUSDTRe();
                          }}
                        >
                          Approve
                        </button>
                      )
                    ) : (
                      <button className="absolute top-[105%] left-[10%] bg-yellow-500 py-0.5 w-3/4 mx-1 rounded-lg">
                        Repurchase In: {timerDisplay}
                      </button>
                    )}
                  </div>
                  </div>
                
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
