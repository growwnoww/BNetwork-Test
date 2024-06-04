"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { FormEvent, useContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import { Context } from "@/components/Context";
import Token_ABI from "@/contract/Token_ABI.json";
import { SelectData } from "@/utils/SelectData";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import USDTToken from "../../../contract/USDTABI.json";
import ClubA_ABI from "@/contract/ClubAContract/ClubA_ABI.json";


import { ClubAPlanetPackage } from "@/utils/ClubAPlanetPackageData";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { clubA_Address } from "@/contract/ClubAContract/ClubA_Instance";
import { SelectClubAData } from "@/utils/SelectClubAData";

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
  const userAddressLocal =
    typeof window !== "undefined" ? localStorage.getItem("userAddress") : null;
  const userAddress = userAddressLocal;
  const [isApprove, setApprove] = useState<boolean>(false);
  const [isApproveRe, setApproveRe] = useState<boolean>(false);
  const [planetBuyRe, setPlanetBuyRe] = useState<boolean>(false);
  const [allow, setAllow] = useState<string>("");
  const [value, setValue] = useState<any>({
    yourAddress: "",
    beliverAddress: "",
    package: "Earth",
  });

    const [curretnPlanetBeliever, setCurrentPlanetBeliever] = useState("");

    const [timer, setTimer] = useState<any>(0);
    const [timerDisplay, setTimerDisplay] = useState<string>("");

  const { walletProvider } = useWeb3ModalProvider();








  const handleSelectPackageChange = (selectedValue: string) => {
    setValue((prevState: any) => ({
      ...prevState,
      package: selectedValue,
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

   
    const getPlanetName = (planetId: number): string | undefined => {
        const planetNames: { [id: number]: string } = {
            1: "Earth 10$",
            2: "Moon  25$",
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



  


    const approveUSDT = async () => {
        try {
            alert(
                "🚸The USDT approval amount must be equal to or greater than the planet purchase amount. Otherwise, your transaction will fail, and you will lose your gas fee. ⚠"
            );
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
            const clubACont = clubAMainContract;
            const getFeeTokenAddress = await clubACont!.getFeeToken();
            console.log("USDT TOken address", getFeeTokenAddress);
            const secondInstance = new ethers.Contract(getFeeTokenAddress, USDTToken, signer);
            const approveAmt = await secondInstance.balanceOf(userAddress);
            console.log("Approve", approveAmt);
            const approve = await secondInstance.approve(clubACont!.address, approveAmt);
            await approve.wait();
            console.log(approve);
            setApprove(true);
        } catch (error) {
            console.log(error);
        }
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


  const fetchEventDataFromTransaction = async (transactionHash:any) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
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
  

  const getThreeAddress = async (leftId:any,midId:any,rightId:any)=>{
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);
  
      const uplineInfo1 = await clubAMainContract.Walletdetails(1,leftId);
      let user1 = uplineInfo1.user;

      const uplineInfo2 = await clubAMainContract.Walletdetails(1,midId);
      let user2 = uplineInfo2.user;

      const uplineInfo3 = await clubAMainContract.Walletdetails(1,rightId);
      let user3 = uplineInfo3.user;
      

      return {user1,user2,user3}
    } catch (error) {
      console.log("something went wrong in getThreeAddress ",error)
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

      let data: { user1: any, user2: any, user3: any } | undefined;

      if (formattedResponse.leftid !== 0 && formattedResponse.middleid !== 0 && formattedResponse.rightid !== 0) {
        data = await getThreeAddress(formattedResponse.leftid, formattedResponse.middleid, formattedResponse.rightid);
      }
  
      let user1 = null, user2 = null, user3 = null;
      if (data) {
        user1 = data.user1;
        user2 = data.user2;
        user3 = data.user3;
      }
      console.log("data destr",data)
  
      return {
        hasSpace,
        leftAdr: user1,
        middlAdr: user2,
        rightAdr: user3,
      };
    } catch (error) {
      console.error('Something went wrong in isGenerationHasSpace:', error);
      // Return a default object in case of an error, indicating there's no space
      return {
        hasSpace: false,
        leftAdr: null,
        middlAdr: null,
        rightAdr: null,
      };
    }
  }

  const findSpace = async (startAddress: any,newId:any) => {
    const queue = [startAddress]; // Initialize a queue with the starting address
  
    while (queue.length > 0) {
      // Dequeue the first item
      const currentAddress = queue.shift()
      // const currentId = queue.shift();
      // console.log("currentId",currentId);
      // let currentAddress;
      
      // const provider = new ethers.providers.Web3Provider(walletProvider as any);
      // const signer = provider.getSigner();
      // const clubAMainContract = new ethers.Contract(clubA_Address, ClubA_ABI, signer);

      // let addressIs = await clubAMainContract.Walletdetails(1,currentId);
      
      // currentAddress = addressIs.user;

      console.log("current Address",currentAddress)


  
      // Check if the current node has space
      const data = await isGenerationHasSpace(currentAddress);
  
      // If it has space, return the current address
      if (data.hasSpace) {
        return currentAddress;
      }
  
      // If no space, add the child nodes to the queue (left, middle, right)
      const { leftAdr, middlAdr, rightAdr } = data;
  
      if (leftAdr) {
        queue.push(leftAdr);
      }
      if (middlAdr) {
        queue.push(middlAdr);
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

  const buyPlanetUser = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const clubAMainContract = new ethers.Contract(
        clubA_Address,
        ClubA_ABI,
        signer
      );
      const myContract = clubAMainContract;
     console.log("new code updated")

      const isPlanetBuyBySponsor = await myContract!.GetGenerationDirectSponser(value.beliverAddress);

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


      // console.log("is GetGenerationDirectSponsor",isPlanetBuyBySponsor[1])
      
  
      let planetBuy;

      if(value.package === "Earth"){

       let newIdis = await clubAMainContract.MatrixDetails(1);
       let newId = ethers.BigNumber.from(newIdis.universalslot).toNumber()

        
        
        const spaceAddress = await findSpace(referrerAddress,newId-1);
        console.log("space address",spaceAddress)
  
        if (spaceAddress) {
          console.log("space address",spaceAddress)
          planetBuy = await myContract!.buyPlannet_user_firstpackage(value.beliverAddress,spaceAddress);
        } else {
          throw new Error("No space available for new registration.");
        }
        
      }
      else{
        planetBuy = await myContract!.buyPlannet_user(value.beliverAddress); 
      }

     

      await planetBuy.wait();
      const transactionReceipt = planetBuy.hash;
      const transactionHash = transactionReceipt;
      
      console.log("referrer address",referrerAddress)

      console.log("transaction hash",transactionHash)
      console.log("transaction receipt",transactionReceipt)
      referrerAddress = await fetchEventDataFromTransaction(transactionReceipt);
      

      let planetId = getPlanetId(value.package)

      postPlanetBuyInfo(userAddress!,Number(planetId),transactionReceipt,referrerAddress!)
  
  

      alert(
        `Planet Buy Successfully! 🚀 To See Changes On Website. Please The refersh the page.`
      );

      // setPlanetBuyStatus((prevStatus) => ({ ...prevStatus, [planetId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setApproveRe(false);
  }, [value.beliverAddress,value.package]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center ">
        <p className="text-2xl my-5 w-fit font-semibold border-b-4 border-b-yellow-500">
          Buy Planet For User In Club-A
        </p>
      </div>

      <div className="w-full h-full items-center justify-center flex flex-col my-4  ">
        <div className="w-fit  flex flex-col  ">
          <div className="flex items-center justify-center">
            <div className="my-3">
              {["Buy Planet"].map((option) => (
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

          <div className="flex items-center justify-center w-auto">
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
                <label>Select Planet</label>
                <Select
                  name="selectedPackage"
                  value={value.package}
                  onValueChange={handleSelectPackageChange}
                >
                  <SelectTrigger className="w-[180px] border border-yellow-400">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {SelectClubAData.map((item) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
