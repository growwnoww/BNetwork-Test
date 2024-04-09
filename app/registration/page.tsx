"use client";
import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

import { IoMdPlanet } from "react-icons/io";
import { TbCards, TbUniverse } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/main/Navbar";
import axios from "axios";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import PlanetUpABI from '../../contract/BNetwork_ABI.json'
import clubAABI from '../../contract/ClubAContract/ClubA_ABI.json'

interface userDetailsType {
    regAddress: string;
    repurchaseCount:number;

}
interface ProcessUserResponse {
    success: boolean;
    user: string;
}

interface SentUserDetails {
    [key: string]: 'processing' | 'completed' | 'failed';
}
const owner = "0xF346C0856DF3e220E57293a0CF125C1322cfD778";

const processSingleUser = async (userDetail: userDetailsType, apiUrl: string): Promise<ProcessUserResponse> => {
    try {
        // Define your payloads based on your user detail
        const userDetailsPayload = {
            regAddress: userDetail.regAddress,
            repurchaseCount:userDetail.repurchaseCount
        };


        // Execute requests sequentially
        await axios.post(`${apiUrl}/user/planetBuy`, userDetailsPayload);
      

        // If requests are successful, return success
        return { success: true, user: userDetail.regAddress };
    } catch (error) {
        console.error(`Failed to process user ${userDetail.regAddress}:`, error);
        // Return failure
        return { success: false, user: userDetail.regAddress };
    }
};

const Page = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Yes");
    const walletContext = useContext(WalletContext);
    const{address} = useWeb3ModalAccount()
    const user = address
    const [inviteAddress, setInviteAddress] = useState<string>("");
    const params = useSearchParams();
    const queryUrl = params.get("rr");
    const[processing,setProcessing] = useState<boolean>(false)
    const {walletProvider} = useWeb3ModalProvider()
    
    const router = useRouter()
   
    
  const [userAllDetails,setAllUserDetails] = useState<userDetailsType[]>([]);
  const [sentUserDetails, setSentUserDetails] = useState<SentUserDetails>({});


  const getAllUsersAndDetails = async () => {
    const usersArray = [];
    try {
      const bNetworkAddress = "0xbBFaA594eA9728CC7811351f57c644e0f3eebe60"
      const provider = new ethers.providers.Web3Provider(walletProvider as any);
      const signer = provider.getSigner();
      const bNetworkContract = new ethers.Contract(bNetworkAddress,clubAABI,signer)
      const myContract = bNetworkContract;
  

        for (let i = 1; i <=10; i++) { // limit to first 10 users for example
            // const address = await myContract!.RegisterUserById(i);
            

            let userDetailsBN = await myContract!.Walletdetails(1,i);
            let userAddress = userDetailsBN.user; 
            let userRepurchaseCount = await myContract!.GetrepuchaseCounter(1,userAddress)
            let repurchaseCount = ethers.BigNumber.from(userRepurchaseCount).toNumber()
            // Copy the original user address


            // Correct specific addresses
            if(userAddress.toLowerCase() === "0xebf738543ade1024f3373c415fbb0669e5de327f") {
                userAddress = "0xc928c65bb83ea7c3a4609046a114670d9fc6217b";
            }

            if(userAddress.toLowerCase() === "0x92858193b01088fe5809856801064f6a380f3c70") {
                userAddress = "0x2c7f4db6a0b1df04ea8550c219318c7f2ff3d34c";
            }

            if(userAddress.toLowerCase() === "0xa7f69414ae98509a3178bdd0c20f1852db69f897"){
                userAddress = "0x971f9b00e7c462790af5229797d4b4fd7863a204";
            }

            if(userAddress.toLowerCase() === "0x01c44d7f36f818b82105dc3eec5a411433589769"){
                userAddress = "0x9927A2CBa1b8CEa3554027D42a39AE9a4A8Fe015"
            }

            if(userAddress.toLowerCase() === "0xa3008d49566f253941ee6a674d6d27a9f0e75ce7"){
                userAddress = "0x2bE39393cd58Cd1c716BcDB95c7EADC5e30a2478"
            }

            if(userAddress.toLowerCase() === "0x0c75f2abeba065292da923214f6f964dc807635c"){
                userAddress = "0xcECfEB87955F9038cDc00A1ACe00FA3550c84E2c"
            }

            if(userAddress.toLowerCase() === "0xe27218d31bea902403dc12aca8ef6adad086494b"){
                userAddress = "0xBF334d8026DB2Ca2a905235fe8d872C5166EF085";
            }

            if(userAddress.toLowerCase() === "0x92dc32aae1e7bee4148908c019530f50f5eb81e8"){
                userAddress = "0xF0a443703d744BF8eADC0b2b874f519bbb588E95"
            }

            // Use the corrected or original address
            const formattedResponse = {
                regAddress: userAddress.toLowerCase(),
                repurchaseCount:repurchaseCount
            };

      
           
            usersArray.push(formattedResponse); // Add the formatted response
            console.log(usersArray)
        }

        setAllUserDetails(usersArray); // Update state with all user details
    
    } catch (error) {
        console.error("something went wrong", error);
    }
  };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };


    const isUserPresent = async (e:FormEvent) =>{
    try {
        e.preventDefault()
        const bNetworkAddress = "0x5ea64Ab084722Fa8092969ED45642706978631BD"
        const provider = new ethers.providers.Web3Provider(walletProvider as any);
        const signer = provider.getSigner();
        const bNetworkContract = new ethers.Contract(bNetworkAddress,PlanetUpABI,signer)
          const myContract = bNetworkContract;

        const isUplineExist = await myContract!.isUserExists(inviteAddress)

        if(!isUplineExist){
            alert("Upline doesnt' exist, use correct upline address")
            return ;
        }

       

        // router.push(`/registration/${inviteAddress}`)
    } catch (error) {
        console.log("something went wrong in isUserPresent ",error)
    }
    }


    
      
      
       useEffect(() => {
         getAllUsersAndDetails();
        }, [])
       

        const processUserBatchSequentially = async () => {
            if (processing) return; // Prevent multiple triggers
            setProcessing(true); // Set processing to true to prevent multiple calls
            const apiUrl = `${process.env.NEXT_PUBLIC_URL}`;
    
            for (const userDetail of userAllDetails) {
                const status = sentUserDetails[userDetail.regAddress];
    
                if (status === 'processing' || status === 'completed') continue;
    
                setSentUserDetails(prev => ({ ...prev, [userDetail.regAddress]: 'processing' }));
    
                const response = await processSingleUser(userDetail, apiUrl);
                
                setSentUserDetails(prev => ({ ...prev, [userDetail.regAddress]: response.success ? 'completed' : 'failed' }));
    
                await new Promise(resolve => setTimeout(resolve, 100)); // Delay to avoid too many requests at once
            }
    
            setProcessing(false); // Processing complete, allow new triggers
        };
    
    
        // Trigger processing
        useEffect(() => {
            if (userAllDetails.length > 0 && !processing) {
                processUserBatchSequentially();
            }
        }, [userAllDetails, processing]); 
        


    
    
    // useEffect(() => {
    //     if (queryUrl) {
    //         setInviteAddress(queryUrl);
    //     }
    // }, [queryUrl]);
    
   

    return (
        <>
            <Navbar />
            <div className=" mt-20 w-full h-screen  rounded-md bg-neutral-950 relative ">
                <div className=" p-4 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-y-5 lg:gap-y-1 ">
                    <div className=" px-5 order-2 lg:order-1 lg:ml-10">
                        <div className="grid grid-cols-2  gap-x-3 gap-y-3 ">
                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex items-center gap-x-3">
                                        <IoMdPlanet className="text-6xl text-yellow-400" />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">
                                            Planet Upgarade System
                                        </h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        Register with a referral link, then you have a better chance that the people you
                                        invite will register strictly by your link.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>

                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full  rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex  items-center gap-x-3">
                                        <TbCards className="text-6xl text-yellow-400" />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">
                                            BN NFT Royalty
                                        </h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        By participating in the program, you get profit and maintain the balance of
                                        our BNS Eco system.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>

                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex  items-center gap-x-3">
                                        <TbUniverse className="text-6xl text-yellow-400" />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">
                                            Universe Club- A, B & C
                                        </h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        The Universe is the heart of our BNS Eco-System, its core layer, a
                                        simulation of real life.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>

                            <div className=" w-full relative max-w-xs">
                                <div className="absolute inset-0 h-full w-full rounded-full blur-3xl" />
                                <div className="relative shadow-xl bg-zinc-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                    <div className="flex  items-center gap-x-3">
                                        <Image src="/b-coin.png" alt="bncoin" height={55} width={55} />

                                        <h1 className="font-bold text-md text-white mb-4 relative z-50">BN Coin</h1>
                                    </div>

                                    <p className="hidden  lg:block font-normal text-sm text-slate-500 mb-4 relative z-50">
                                        By participating In the BNETWORK Space Eco-System, You will get all Profit in BN
                                        Coin For Increase Utilities.
                                    </p>

                                    {/* Meaty part - Meteor effect */}
                                    <Meteors number={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full order-1 lg:order-2  max-w-lg mx-auto  bg-zinc-900 rounded-lg shadow-lg p-8 z-10">
                        <h2 className="text-2xl lg:text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
                            Registration For Believe Network
                        </h2>
                        <div className="mb-10">
                            <p className="text-gray-400 text-center">Do you already have an Upline?</p>
                            <div className="flex justify-around mt-4">
                                {["Yes", "No"].map((option) => (
                                    <button
                                        key={option}
                                        className={classNames(
                                            "text-lg font-semibold py-2 px-6 rounded-full transition-all duration-300",
                                            {
                                                "bg-yellow-500 hover:bg-yellow-700 text-white":
                                                    selectedOption === option,
                                                "bg-gray-700 text-gray-300": selectedOption !== option,
                                            }
                                        )}
                                        onClick={() => handleOptionChange(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedOption === "Yes" ? (
                            <form className="space-y-4  " onSubmit={(e)=>isUserPresent(e)} >
                                <div className="flex flex-col py-4">
                                    <label htmlFor="bnId" className="text-gray-400 mb-2">
                                        Enter Upline Address
                                    </label>
                                    <input
                                        id="bnId"
                                        onChange={(e) => setInviteAddress(e.target.value)}
                                        value={(queryUrl as string) || inviteAddress}
                                        type="text"
                                        className="bg-gray-800 text-white rounded-lg p-3 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="Upline  Address"
                                    />
                                </div>
                               
                                    <button
                                    type="submit"
                                    className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300">
                                        Verify Upline
                                    </button>
                               
                            </form>
                        ) : (
                            <Link href="/signup">
                                <button className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300">
                                    Sign up
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <BackgroundBeams />
            </div>
        </>
    );
};

export default Page;