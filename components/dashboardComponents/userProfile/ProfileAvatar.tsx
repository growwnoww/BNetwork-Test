"use client";
import useLatestPlanet from "@/Hooks/useLatestPlanet";
import { Context } from "@/components/Context";
import UserInfo from "@/components/clientcomponents/UserInfo";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

const ProfileAvatar = () => {
    // const host = window.location.hostname;
    const planetCountContract = useLatestPlanet();
    const planetCount = ethers.BigNumber.from(planetCountContract).toNumber();
    const walletContext = useContext(WalletContext);
    const userAddress = walletContext?.userAddress;

    const getPlanetInString = (planetId: number): string | undefined => {
        const planetNames: { [id: number]: string } = {
            1: "Earth",
            2: "Moon",
            3: "Mars",
            4: "Mercury",
            5: "Venus",
            6: "Jupiter",
            7: "Saturn",
            8: "Uranus",
            9: "Neptune",
            10: "Pluto",
        };

        return planetNames[planetId];
    };

    const userAvatar = getPlanetInString(planetCount) || "just_reg";

    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="">
                <Image src={`/${userAvatar}.png`} alt="Pluto.png" loading="lazy" height={300} width={300} />
            </div>

            <div
                onClick={() => copyToClipboard(`https://bnetwork.space/registration?rr=${userAddress}`)}
                className="flex cursor-pointer items-center justify-center gap-x-3 w-auto lg:w-full bg-yellow-500 rounded-md px-[20%] sm:px-28 md:px-16 py-1"
            >
                <p>Copy Referrel link </p>
                <span>
                    <FaRegCopy
                        className="cursor-pointer"
                        onClick={() => copyToClipboard(`https://BNetwork.space/registration?rr=${userAddress}`)}
                        // onClick={() => copyToClipboard(`http://${host}/registration?rr=${userAddress}`)}
                    />
                </span>
            </div>
            <div className="pt-5 lg:w-full">
                <UserInfo />
            </div>
        </>
    );
};

export default ProfileAvatar;
