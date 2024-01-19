"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

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
        title: "All Services",
        link: "#allservice",
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
        title: "Review",
        link: "#review",
    },
    {
        title: "FAQ",
        link: "#faq",
    },
];

const Navbar = () => {
    const [activeNav, setActiveNav] = useState<String>("#home");
    const [userAddress, setUserAddress] = useState<String>();
    console.log(userAddress);
    return (
        <div className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/50  bg-[#03001417] backdrop-blur-md z-50 px-10">
            <div className="w-full h-full flex flex-row items-center text-xs font-semibold">
                <div>
                    <Image src="/logo.png" alt="logo" loading="lazy" width={100} height={50} />
                </div>
                {navList.map((NavRoute, index) => (
                    <div key={index} className={`px-3 ${activeNav === NavRoute.link ? "text-yellow-400" : ""}`}>
                        <a href={NavRoute.link} onClick={() => setActiveNav(NavRoute.link)}>
                            {NavRoute.title}
                        </a>
                    </div>
                ))}
                <div className="ml-auto flex items-center gap-5 ">
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
                                                        setUserAddress(() => account.address);
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
                    <div className="bg-gray-800 px-3 py-1 rounded-md">ENG</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
