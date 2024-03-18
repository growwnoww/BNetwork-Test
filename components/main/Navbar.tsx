"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Context } from "../Context";
import { IoCloseSharp, IoMenu } from "react-icons/io5";

import { WalletContext } from "@/context/WalletContext";
import useUserDetails from "@/Hooks/useUserDetails";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { connect } from "http2";
import { useAccount, useConnect } from "wagmi";
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
    console.log("IS USER REGISTER",isUserRegister)
    
    const router = useRouter(); // Add this line

  
    
    // Add this useEffect
    useEffect(() => {
        if (isUserRegister && walletContext?.userAddress) {
            router.push('/dashboard'); // Redirect user to dashboard if they are registered
        }
    }, [isUserRegister, walletContext?.userAddress, router]);



   

    return (
        <div className="w-full h-[70px] fixed top-0 bg-transparent shadow-lg backdrop-blur-md z-50 px-4 md:px-10">
            <div className="w-full h-full flex flex-row items-center justify-between text-xs font-semibold">
                <div>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" loading="lazy" width={100} height={50} />
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                <div className="px-3  md:hidden ">
                        {/* <div className="bg-yellow-500 px-3  py-2.5 rounded-md">Connect Wallet</div> */}
                        <ConnectButton.Custom>
                            {({
                                account,
                                chain,
                                openAccountModal,
                                openChainModal,
                                openConnectModal,
                                authenticationStatus,
                                mounted,
                            }) => {
                                // Note: If your app doesn't use authentication, you
                                // can remove all 'authenticationStatus' checks
                                const ready = mounted && authenticationStatus !== "loading";
                                const connected =
                                    ready &&
                                    account &&
                                    chain &&
                                    (!authenticationStatus || authenticationStatus === "authenticated");

                                return (
                                    <div
                                        {...(!ready && {
                                            "aria-hidden": true,
                                            style: {
                                                opacity: 0,
                                                pointerEvents: "none",
                                                userSelect: "none",
                                            },
                                        })}
                                    >
                                        {(() => {
                                            if (!connected) {
                                                return (
                                                    <button
                                                        onClick={openConnectModal}
                                                        type="button"
                                                        className="bg-yellow-500 px-3  py-2.5 rounded-md whitespace-nowrap"
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                );
                                            }

                                            if (chain.unsupported) {
                                                return (
                                                    <button
                                                        onClick={openChainModal}
                                                        type="button"
                                                        className="bg-[#FF6347] px-3  py-2.5 rounded-md whitespace-nowrap"
                                                    >
                                                        Wrong network
                                                    </button>
                                                );
                                            }

                                            return (
                                                <div style={{ display: "flex", gap: 12 }}>
                                                    <button
                                                        onClick={() => {
                                                            openAccountModal();
                                                            walletContext?.setUserAddress(() => account?.address.toLowerCase());
                                                        }}
                                                        type="button"
                                                        className="bg-yellow-500 px-3  py-2.5 rounded-md whitespace-nowrap"
                                                    >
                                                        {account.displayName}
                                                        {account.displayBalance ? ` (${account.displayBalance})` : ""}
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
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
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            // Note: If your app doesn't use authentication, you
                            // can remove all 'authenticationStatus' checks
                            const ready = mounted && authenticationStatus !== "loading";
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus || authenticationStatus === "authenticated");

                            return (
                                <div
                                    {...(!ready && {
                                        "aria-hidden": true,
                                        style: {
                                            opacity: 0,
                                            pointerEvents: "none",
                                            userSelect: "none",
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button
                                                    onClick={openConnectModal}
                                                    type="button"
                                                    className="bg-yellow-500 px-3  py-2.5 rounded-md whitespace-nowrap"
                                                >
                                                    Connect Wallet
                                                </button>
                                            );
                                        }

                                        if (chain.unsupported) {
                                            return (
                                                <button
                                                    onClick={openChainModal}
                                                    type="button"
                                                    className="bg-[#FF6347] px-3  py-2.5 rounded-md whitespace-nowrap"
                                                >
                                                    Wrong network
                                                </button>
                                            );
                                        }

                                        return (
                                            <div style={{ display: "flex", gap: 12 }}>
                                                <button
                                                    onClick={() => {
                                                        openAccountModal();
                                                        walletContext?.setUserAddress(() => account.address.toLowerCase());
                                                    }}
                                                    type="button"
                                                    className="bg-yellow-500 px-3  py-2.5 rounded-md whitespace-nowrap"
                                                >
                                                    {account.displayName}
                                                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                  
                    <div>
                       {
                        isUserRegister && walletContext?.userAddress?
                        (
                            ''
                        )
                        :
                        (
                            <div>
                            
                            <Link href="/registration">
                            <Button
                               
                               className=" bg-zinc-900  text-white border border-yellow-500"
                                 >
                                   Registration
                                 </Button>
                              
                            </Link>
                          </div> 
                        )
                       }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
