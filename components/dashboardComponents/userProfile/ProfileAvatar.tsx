"use client";
import { Context } from "@/components/Context";
import UserInfo from "@/components/clientcomponents/UserInfo";
import Image from "next/image";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

const ProfileAvatar = () => {
    const { userAddress } = useContext(Context);

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

            <div className="flex  items-center gap-x-3 bg-yellow-500 px-8 rounded-md sm:px-24   py-1">
                <p>Copy Referrel link </p>
                <span>
                    <FaRegCopy
                        onClick={() => copyToClipboard(`https://bnetwork.space/Home/Registration?rr=${userAddress}`)}
                    />
                </span>
            </div>
            <div className="pt-5 ">
                <UserInfo />
            </div>
        </>
    );
};

export default ProfileAvatar;
