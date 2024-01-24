"use client";
import { Context } from "@/components/Context";
import BtnWrapper from "@/components/WrapperComponent/BtnWrapper";
import UserInfo from "@/components/clientcomponents/UserInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaRegCopy } from "react-icons/fa";

const ProfileAvatar = () => {
    const router = useRouter();
    const { userAddress } = useContext(Context);

    const copyToClipboard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("Copied");
        } catch (error) {
            console.log(error);
        }
    };

    console.log(router);

    return (
        <>
            <div className="">
                <Image src="/Pluto.png" alt="Pluto.png" loading="lazy" height={300} width={300} />
            </div>

            <div onClick={() => copyToClipboard(`https://bnetwork.space/Home/Registration?rr=${userAddress}`)}>
                <BtnWrapper text="Copy Referral Link" height="py-2" width="px-24" icon={<FaRegCopy />} />
            </div>
            <div className="pt-5">
                <UserInfo />
            </div>
        </>
    );
};

export default ProfileAvatar;
