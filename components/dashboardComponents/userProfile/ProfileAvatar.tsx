"use client";
import useLatestPlanet from "@/Hooks/useLatestPlanet";
import { Context } from "@/components/Context";
import UserInfo from "@/components/clientcomponents/UserInfo";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

interface userDetailsInfo {
    bn_id: string;
    reg_user_address: string;
    latestPlanetName: string;
}

const ProfileAvatar = () => {
    // const host = window.location.hostname;
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;
    const [userDetails, setUserDetails] = useState<userDetailsInfo>();

    const userAvatar = userDetails?.latestPlanetName || "just_reg";

    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios(
                `${process.env.NEXT_PUBLIC_URL}/user/getUserInfo/${userAddress?.toLowerCase()}`
            );
            if (response.data) {
                const data: userDetailsInfo = await response.data;
                console.log("User detail from get req ", data);
                setUserDetails(data);
            } else {
                throw new Error(`HTTP error! status: res} $`);
            }
        } catch (error) {
            console.log("something went wrong in getUserDetails", error);
        }
    };

    useEffect(() => {
        getUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    return (
        <>
            <div className="">
                <Image src={`/${userAvatar}.png`} alt="Pluto.png" loading="lazy" height={300} width={300} />
            </div>

            <div
                onClick={() =>
                    copyToClipboard(`https://www.bnetwork.space//registration?rr=${userAddress?.toLowerCase()}`)
                }
                className="flex cursor-pointer items-center justify-center gap-x-3 w-auto lg:w-full bg-yellow-500 rounded-md px-[20%] sm:px-28 md:px-16 py-1"
            >
                <p>Copy Referrel link </p>
                <span>
                    <FaRegCopy />
                </span>
            </div>
            <div className="pt-5 lg:w-full">
                <UserInfo />
            </div>
        </>
    );
};

export default ProfileAvatar;
