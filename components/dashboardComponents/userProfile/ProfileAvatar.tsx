"use client";
import { Context } from "@/components/Context";
import UserInfo from "@/components/clientcomponents/UserInfo";
import Image from "next/image";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

const ProfileAvatar = () => {
    const { userAddress } = useContext(Context);
    const host = window.location.hostname;

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
                <Image src="/Pluto.png" alt="Pluto.png" loading="lazy" height={300} width={300} />
            </div>

            <div className="flex items-center justify-center gap-x-3 w-auto lg:w-full bg-yellow-500 rounded-md px-[20%] sm:px-28 md:px-16 py-1">
                <p>Copy Referrel link </p>
                <span>
                    <FaRegCopy
                        className="cursor-pointer"
                        // onClick={() => copyToClipboard(`https://bnetwork.space/registration?rr=${userAddress}`)}
                        onClick={() => copyToClipboard(`http://${host}/registration?rr=${userAddress}`)}
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
