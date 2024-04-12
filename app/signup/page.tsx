"use client";
import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { IoMdPlanet } from "react-icons/io";
import { TbCards, TbUniverse } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/main/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import BNetworkABI from "@/contract/BNetwork_ABI.json";

import { useRouter } from "next/navigation";
import CustomCheckbox from "@/components/CustomeCheckbox";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import axios from "axios";
interface userDetailsType {
    regUser: string;
    regTime: string;
    regId: number;
    regReferal: string;
    regReferalId: number;
    teamCount: number;
    highestPlanetCount: number;
}

const Page = () => {
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const { isConnected } = useWeb3ModalAccount();
    const [userDetails, setUserDetails] = useState<userDetailsType>();
    const router = useRouter();
    const ownerAddress = "0x2C7f4dB6A0B1df04EA8550c219318C7f2FF3D34C";

    const B_Network_Address = walletContext?.B_Network_Address;

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [tranxHash, setTranxHash] = useState<string>();
    const { walletProvider } = useWeb3ModalProvider();

    const getUserDetail = async () => {
        try {
            if (!userAddress || !isConnected) {
                return;
            }

            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            // const MyContract = bNetwork();

            const exists = await BNetworkContract.isUserExists(userAddress);
            const highestPlanetCount = await BNetworkContract.UserPlannet(userAddress);

            if (exists) {
                const response = await BNetworkContract.RegisterUserDetails(userAddress);

                console.log("Got user details", response);

                const formattedResponse = {
                    regUser: String(response.regUser).toLowerCase(),
                    regTime: ethers.BigNumber.from(response.regTime).toString(), // or .toNumber() if safe
                    regId: ethers.BigNumber.from(response.regId).toNumber(),
                    regReferal: String(response.regReferal).toLowerCase(),
                    regReferalId: ethers.BigNumber.from(response.regReferalId).toNumber(), // Assuming this is already a number
                    teamCount: ethers.BigNumber.from(response.teamCount).toNumber(),
                    highestPlanetCount: ethers.BigNumber.from(highestPlanetCount).toNumber(),
                };

                setUserDetails(formattedResponse);

                console.log("Refined Data", formattedResponse);
            }
        } catch (error) {
            console.log("Something wrong in userDetailsFUnc", error);
        }
    };

    const registerUserByManager = async () => {
        if (!isConnected) {
            alert("Connect Your Wallet!");
            return;
        }
        try {
            if (!termsAccepted) {
                alert("You must accept the terms and conditions to register.");
                return;
            }
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const gasPrice = await signer.getGasPrice();

            // const myContract = BNetwork();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const userExisit = await BNetworkContract.UserRegister(userAddress);
            const gasFee = await BNetworkContract.gasfees();
            const convert = Number(gasFee?._hex).toString();
            if (userExisit === false) {
                console.log("cheching upline address before reg", ownerAddress);
                const registration = await BNetworkContract.registrations(ownerAddress, {
                    gasPrice: gasPrice,
                    gasLimit: "200000",
                    value: convert,
                });
                await registration.wait();

                getUserDetail();
                console.log("registration hash", registration.hash);
                setTranxHash(registration.hash);
                alert("Registration Successfully");

                // router.push("/dashboard");
                console.log(registration);
            } else {
                alert("You already registered");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const createRegister = async () => {
            try {
                console.log("reg user", userDetails?.regUser);
                const owner = ownerAddress;
                let uplineAddrLocal = "";
                let uplineBNIdLocal = "";

                // Use userDetails directly now, assuming it has been set by this point
                if (
                    userDetails?.regReferal === "0x0000000000000000000000000000000000000000" ||
                    !userDetails?.regReferalId
                ) {
                    uplineAddrLocal = owner;
                    uplineBNIdLocal = "BN" + owner.substring(owner.length - 8);
                } else {
                    uplineAddrLocal = userDetails.regReferal;
                    uplineBNIdLocal = "BN" + userDetails.regReferal.substring(userDetails.regReferal.length - 8);
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

                const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/user/createUserDetails`, payload);

                if (res.data) {
                    router.push("/dashboard");
                } else {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
            } catch (error) {
                console.error("Error in createRegister:", error);
            }
        };

        if (userDetails && tranxHash) {
            createRegister();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, tranxHash]);

    return (
        <>
            <Navbar />
            <div className=" mt-20 w-full h-full  rounded-md bg-neutral-950 relative ">
                <div className="grid grid-cols-1 gap-y-4 lg:gap-y-0 lg:grid-cols-2 place-items-center    w-full h-screen ">
                    <div className=" px-5 mx-10 lg:ml-10 ">
                        <div className="py-6 flex flex-col items-start justify-start">
                            <p className=" text-3xl lg:text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6">
                                Registration for Believe Network
                            </p>
                        </div>

                        <div className="flex items-center  gap-x-4 py-2 ">
                            <div className="text-center">
                                <Image
                                    src="/Pluto.png"
                                    alt="pluto"
                                    height={80}
                                    width={80}
                                    loading="lazy"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p>Pluto</p>
                                <p className="text-md lg:text-xl">Your Upline</p>
                                <p className="text-xs">0xC928c65bb83Ea7C3A4609046a114670D9fC6217B</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 h-1/4  gap-x-3 gap-y-3 ">
                            <div className="bg-zinc-800 rounded-md py-1 gap-x-1">
                                <div className="px-5 lg:text-center">
                                    <p className="text-md lg:text-xl">Direct Believer partner</p>
                                    <span className="text-md lg:text-xl ">2103</span>
                                </div>
                            </div>

                            <div className="bg-zinc-800 rounded-md  py-1  gap-x-1">
                                <div className="px-5 lg:text-center">
                                    <p className="text-md lg:text-xl">Registration Date</p>
                                    <span className="text-md lg:text-xl">02.02.2024</span>
                                </div>
                            </div>

                            <div className="bg-zinc-800 rounded-md  py-1  gap-x-1">
                                <div className="px-5 lg:text-center">
                                    <p className="text-md lg:text-xl">Total Team</p>
                                    <span className="text-md lg:text-xl">301</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-auto mx-10 lg:w-3/4   bg-[#121212] rounded-lg shadow-lg py-16 px-8 flex flex-col gap-y-5 z-20 ">
                        <div className="flex flex-col gap-y-5">
                            <h2 className="text-3xl lg:text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent  font-bold ">
                                Registration For Believe Network
                            </h2>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Confirm that you agree with Terms of use and press the button Sing up
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 ">
                            <div className="flex items-start justify-start gap-x-3 flex-row ">
                                <CustomCheckbox
                                    label="Accept terms and conditions"
                                    checked={termsAccepted}
                                    onChange={setTermsAccepted} // Directly pass setTermsAccepted here
                                />
                                <div className=" leading-none">
                                    <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Accept terms and conditions
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        You agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={registerUserByManager}
                            className={`${
                                termsAccepted ? "bg-yellow-500 hover:bg-yellow-700" : "bg-yellow-600"
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center`}
                        >
                            <button>sign up</button>
                        </div>
                    </div>
                </div>
                <BackgroundBeams />
            </div>
        </>
    );
};

export default Page;
