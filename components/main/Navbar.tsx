"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Context } from "../Context";
import { IoCloseSharp, IoMenu } from "react-icons/io5";

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
    const { userAddress, setUserAddress } = useContext(Context);

    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10">
            <div className="w-full h-full flex flex-row items-center justify-between text-xs font-semibold">
                <div>
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" loading="lazy" width={100} height={50} />
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <IoCloseSharp className="h-6 w-6" /> : <IoMenu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Navigation Links and additional options */}
                <div
                    className={`${
                        isMenuOpen ? "flex" : "hidden"
                    } flex-col gap-y-4  py-2 items-s md:flex md:flex-row md:items-center absolute md:static md:bg-transparent md:text-[15px] bg-indigo-950  w-fit px-10  rounded-tl-md rounded-bl-md right-[0%] top-[97%] md:top-0 md:w-auto`}
                >
                    {navList.map((NavRoute, index) => (
                        <div
                            key={index}
                            className={`px-3 ${activeNav === NavRoute.link ? "text-yellow-400" : ""} md:mx-2`}
                        >
                            <Link
                                href={NavRoute.link}
                                onClick={() => {
                                    setActiveNav(NavRoute.link);
                                    setIsMenuOpen(false);
                                }}
                            >
                                {NavRoute.title}
                            </Link>
                        </div>
                    ))}
                    {/* Wallet Connect Button */}
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
                                                            setUserAddress(() => account?.address);
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
                    <div className="px-3 md:hidden bg-gray-800 py-1 rounded-md w-fit ">
                        <button
                            onClick={() => {
                                /* Language change logic here */
                            }}
                        >
                            ENG
                        </button>
                    </div>
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
