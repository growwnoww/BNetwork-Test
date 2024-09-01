"use client";
import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useParams, useSearchParams } from "next/navigation";
import { Context } from "@/components/Context";
import { IoMdPlanet } from "react-icons/io";
import { TbCards, TbUniverse } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/main/Navbar";
import axios from "axios";

import useOwner from "@/Hooks/useOwner";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";

import { BackgroundBeams } from "@/components/ui/background-beams";

import UplineInfo from "@/components/UplineInfo";
import { useRouter } from "next/navigation";
import CustomCheckbox from "@/components/CustomeCheckbox";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";
import BNetworkABI from "@/contract/BNetwork_ABI.json";
import { PlanetUpgrade_Address } from "@/contract/Web3_Instance";
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
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [inviteAddress, setInviteAddress] = useState<string>("");
    const router = useRouter();
    const params = useSearchParams();
    const queryUrl = params.get("rr");
    const params1 = useParams();
    console.log("params1", params1);
    const uplineAddressStr: string = String(params1.upline_address);
    console.log("upline address", uplineAddressStr);
    const owner = useOwner();
    const [userDetails, setUserDetails] = useState<userDetailsType>();
    const { isConnected } = useWeb3ModalAccount();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [tranxHash, setTranxHash] = useState<string>();

    const { walletProvider } = useWeb3ModalProvider();

    const B_Network_Address = PlanetUpgrade_Address;

    const getUserDetail = async () => {
        try {
            if (!userAddress || !isConnected) {
                return;
            }
            const provider = new ethers.providers.Web3Provider(walletProvider as any);
            const signer = provider.getSigner();
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);

            const exists = await BNetworkContract.isUserExists(userAddress);

            if (exists) {
                const response = await BNetworkContract.RegisterUserDetails(userAddress);
                const highestPlanetCount = await BNetworkContract.UserPlannet(userAddress);

                console.log("Got user details", response);

                const formattedResponse: userDetailsType = {
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

    const registerUser = async (e: any) => {
        e.preventDefault();

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
            const BNetworkContract = new ethers.Contract(B_Network_Address, BNetworkABI, signer);
            const gasPrice = await signer.getGasPrice();
            const gasP = ethers.BigNumber.from(gasPrice).toNumber()
            console.log("gas price",gasP)

            const userExisit = await BNetworkContract.isUserExists(userAddress);

            const gasFee = await BNetworkContract.gasfees();
            const gf = ethers.BigNumber.from(gasFee).toNumber()
            console.log()
            console.log("gasFee",gf)
            const convert = Number(gasFee?._hex).toString();
            console.log("convert",convert)

            if (userExisit === false) {
                console.log("cheching upline address before reg", uplineAddressStr);
                const registration = await BNetworkContract.registrations(uplineAddressStr, {
                    gasPrice: gasPrice,
                    gasLimit: "200000",
                    value: convert,
                });
                await registration.wait();
                console.log("registration hash", registration.hash);
                setTranxHash(registration.hash);
                console.log(registration);
                getUserDetail();
                alert("Registration Successfully");
                router.push("/dashboard")
            } else {
                alert("You already registered");
            }
        } catch (error) {
            console.log("something went wrong ", error);
        }
    };

    useEffect(() => {
        const createRegister = async () => {
            try {
                console.log("reg user", userDetails?.regUser);
                const owner = "0xf346c0856df3e220e57293a0cf125c1322cfd778";
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
             regAddress: userDetails?.regUser,
             reg_time: userDetails?.regTime,
             regId: userDetails?.regId,
             upline_referral_address: uplineAddrLocal,
             upline_referralId: userDetails?.regReferalId,
             upline_referral_BNId: uplineBNIdLocal,
             direct_count: userDetails?.teamCount,
             reg_transaction_hash:tranxHash
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
                    <UplineInfo uplineAddress={uplineAddressStr} />

                    <div className="w-auto mx-10 lg:w-3/4   bg-[#121212] rounded-lg shadow-lg py-16 px-8 flex flex-col gap-y-5 z-50 ">
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
                            onClick={registerUser}
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
