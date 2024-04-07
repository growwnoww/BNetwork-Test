"use client";
import React, { useState, useEffect, useContext } from "react";
import { RiBitCoinLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import axios from "axios";
import { WalletContext } from "@/context/WalletContext";
import { useSearchParams } from "next/navigation";

const Protfolio = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("preview");
    const [portfolioInfo, setPortfolioInfo] = useState<any>({});
    const walletContext = useContext(WalletContext);
    let userAddress: string;
    if (query) {
        userAddress = query?.toLowerCase();
    } else {
        userAddress = walletContext?.userAddress?.toLowerCase() || "";
    }
    const [isWideScreen, setIsWideScreen] = useState(process.browser ? window.innerWidth >= 1280 : true);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 1280);
        };

        if (process.browser) {
            window.addEventListener("resize", handleResize);
        }
        return () => {
            if (process.browser) {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    useEffect(() => {
        const fetchPortfolioInfo = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_URL}/user/getPortfolioInfo/${userAddress?.toLowerCase()}`
                );
                console.log(response.data);
                setPortfolioInfo(response.data);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
                setPortfolioInfo({});
            }
        };

        if (userAddress) {
            fetchPortfolioInfo();
        }
    }, [userAddress, query]);

    const dataDisplay = isWideScreen
        ? [
              { title: "BN Max Rewards Coins", icon: <RiBitCoinLine />, field: "maxBNRewardCoin", isCoin: true },
              { title: "Direct Earning", icon: <BsCoin />, field: "directEarningsAmount", isCurrency: true },
              { title: "BN Max Airdrop Coins", icon: <RiBitCoinLine />, field: "maxBNAirdropCoin", isCoin: true },
              { title: "Tier Earning", icon: <BsCoin />, field: "tierEarningsAmount", isCurrency: true },
              { title: "BN Airdrop Coins", icon: <RiBitCoinLine />, field: "bn_airdrop_coin", isCoin: true },
              { title: "Planet Upgrade Earning", icon: <BsCoin />, field: "planetUpgradeEarningAmt", isCurrency: true },
              { title: "Airdrop Refer Coin", icon: <RiBitCoinLine />, field: "bn_airdrop_refer_coin", isCoin: true },
              { title: "Planet Autopool Earning", icon: <BsCoin />, field: "planetAutoPoolEarning", isCurrency: true },
              { title: "BN Reward Coin", icon: <RiBitCoinLine />, field: "bn_reward_coin", isCoin: true },
              { title: "Universe Club A Global Earning", icon: <BsCoin />, field: "Club_A_Global_Earning" },

              { title: "Total BN Coin", icon: <RiBitCoinLine />, field: "totalBnCoin", isCoin: true },

              { title: "Universe Club A Tier Earning", icon: <BsCoin />, field: "Club_A_Tier_Earning" },
              { title: "My Laps/Lost Earning", icon: <BsCoin />, field: "myLaps" },

              { title: "Total Earning", icon: <BsCoin />, field: "totalEarning", isCurrency: true },
          ]
        : [
              { title: "BN Max Rewards Coins", icon: <RiBitCoinLine />, field: "maxBNRewardCoin", isCoin: true },
              { title: "BN Max Airdrop Coins", icon: <RiBitCoinLine />, field: "maxBNAirdropCoin", isCoin: true },
              { title: "BN Airdrop Coins", icon: <RiBitCoinLine />, field: "bn_airdrop_coin", isCoin: true },
              { title: "Airdrop Refer Coin", icon: <RiBitCoinLine />, field: "bn_airdrop_refer_coin", isCoin: true },

              { title: "BN Reward Coin", icon: <RiBitCoinLine />, field: "bn_reward_coin", isCoin: true },
              { title: "Total BN Coin", icon: <RiBitCoinLine />, field: "totalBnCoin", isCoin: true },
              { title: "Direct Earning", icon: <BsCoin />, field: "directEarningsAmount", isCurrency: true },
              { title: "Tier Earning", icon: <BsCoin />, field: "tierEarningsAmount", isCurrency: true },
              { title: "Planet Upgrade Earning", icon: <BsCoin />, field: "planetUpgradeEarningAmt", isCurrency: true },
              { title: "Planet Autopool Earning", icon: <BsCoin />, field: "planetAutoPoolEarning", isCurrency: true },
              { title: "Universe Club A Global Earning", icon: <BsCoin />, field: "Club_A_Global_Earning" },
              { title: "Universe Club A Tier Earning", icon: <BsCoin />, field: "Club_A_Tier_Earning" },
              { title: "My Laps/Lost Earning", icon: <BsCoin />, field: "myLaps" },
              { title: "Total Earning", icon: <BsCoin />, field: "totalEarning", isCurrency: true },
          ];

    return (
        <div className="grid grid-cols-1 w-full xl:grid-cols-2">
            {dataDisplay.map((data, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between w-full px-2 py-6 border-b-[.5px] border-b-zinc-600 md:border-r md:border-r-zinc-600"
                >
                    <div className="flex items-center gap-x-2">
                        <span className="text-yellow-500 text-3xl">{data.icon}</span>
                        <span className="text-md md:text-sm xl:text-sm 2xl:text-md 3xl:text-xl">{data.title}</span>
                    </div>
                    <div>
                        <span className="text-sm md:text-xs xl:text-md 2xl:text-[14px] text-stone-400">
                            {portfolioInfo[data.field]
                                ? data.isCoin
                                    ? `${portfolioInfo[data.field]} BN Coin`
                                    : data.isCurrency
                                    ? `$ ${portfolioInfo[data.field].toLocaleString()}`
                                    : `${portfolioInfo[data.field]}`
                                : "NA"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Protfolio;
