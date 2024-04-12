/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { Suspense, useContext, useEffect, useState } from "react";
import Link from "next/link";
import useUserDetails from "@/Hooks/useUserDetails";
import { WalletContext } from "@/context/WalletContext";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import PreviewComp from "../PreviewComp";
interface NavItem {
    title: string;
    link: string;
}

const navList: NavItem[] = [
    {
        title: "Home",
        link: "#home",
    },

    {
        title: "Roadmap",
        link: "#roadmap",
    },
    {
        title: "Statistics",
        link: "#statistics",
    },
    {
        title: "How it works",
        link: "#howitworks",
    },
    {
        title: "Calculator",
        link: "#review",
    },
    {
        title: "FAQ",
        link: "#faq",
    },
];

const Navbar = () => {
    const [activeNav, setActiveNav] = useState<String>("#home");
    const walletContext = useContext(WalletContext);
    const isUserRegister = useUserDetails();

    console.log("IS USER REGISTER", isUserRegister);

    const router = useRouter(); // Add this line
    const { open } = useWeb3Modal();
    const { address, isConnected } = useWeb3ModalAccount();

    // Add this useEffect
    useEffect(() => {
        if (isUserRegister && address) {
            router.push("/dashboard"); // Redirect user to dashboard if they are registered
        }
    }, [isUserRegister, address]);

    return (
        <div className="w-full h-[70px] fixed top-0 bg-transparent shadow-lg backdrop-blur-md z-50 px-4 md:px-10">
            <div className="w-full h-full flex flex-row items-center justify-between text-xs font-semibold">
                <div>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" loading="lazy" width={100} height={50} />
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <div className="flex md:hidden">
                <PreviewComp />
                    <div className="px-3  md:hidden ">
                        <button
                            onClick={() => open()}
                            type="button"
                            className="bg-yellow-500 px-3  py-2.5 rounded-md whitespace-nowrap"
                        >
                            {!isConnected
                                ? "Connect Wallet"
                                : `${address?.slice(0, 6)}...${address?.slice(address.length - 6, address.length)}`}
                        </button>
                    </div>
                </div>

                {/* Navigation Links and additional options */}
                <div
                    className={`gap-y-4  hidden lg:flex   py-2 items-start md:flex-row md:items-center absolute md:static md:bg-transparent md:text-[15px] bg-indigo-950  w-fit px-10  rounded-tl-md rounded-bl-md right-[0%] top-[97%] md:top-0 md:w-auto `}
                >
                    {navList.map((NavRoute, index) => (
                        <div
                            key={index}
                            className={`px-3  ${activeNav === NavRoute.link ? "text-yellow-400" : ""} md:mx-2 text-sm`}
                        >
                            <Link
                                href={NavRoute.link}
                                onClick={() => {
                                    setActiveNav(NavRoute.link);
                                }}
                            >
                                {NavRoute.title}
                            </Link>
                        </div>
                    ))}
                    {/* Wallet Connect Button */}
                </div>

                {/* Wallet and Language Selection for Desktop */}
                <div className="hidden md:flex items-center gap-5">
                    <PreviewComp />
                    <button
                        onClick={() => open()}
                        type="button"
                        className="bg-yellow-500 px-3  py-2.5 rounded-md whitespace-nowrap"
                    >
                        {!isConnected
                            ? "Connect Wallet"
                            : `${address?.slice(0, 6)}...${address?.slice(address.length - 6, address.length)}`}
                    </button>

                    <div>
                        {isUserRegister && walletContext?.userAddress ? (
                            ""
                        ) : (
                            <div>
                                <Link href="/registration">
                                    <Button className=" bg-zinc-900  text-white border border-yellow-500">
                                        Registration
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
