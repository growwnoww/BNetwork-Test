"use client";
import React, { useState, useEffect, useContext } from 'react';
import { RiBitCoinLine } from 'react-icons/ri';
import { BsCoin } from 'react-icons/bs';
import axios from 'axios';
import { WalletContext } from '@/context/WalletContext';

const Protfolio = () => {
  const [portfolioInfo, setPortfolioInfo] = useState<any>({});
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;

  useEffect(() => {
    const fetchPortfolioInfo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getPortfolioInfo/${userAddress}`);
        setPortfolioInfo(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setPortfolioInfo(null);
      }
    };

    if (userAddress) {
      fetchPortfolioInfo();
    }
  }, [userAddress]);

  const dataDisplay = [
    { title: "BN Max Rewards Coins", icon: <RiBitCoinLine />, field: 'maxBNRewardCoin', isCoin: true },
    { title: "Direct Earning", icon: <BsCoin />, field: 'directEarningsAmount', isCurrency: true },
    { title: "BN Max Airdrop Coins", icon: <RiBitCoinLine />, field: 'maxBNAirdropCoin', isCoin: true },
    { title: "Tier Earning", icon: <BsCoin />, field: 'tierEarningsAmount', isCurrency: true },
    { title: "BN Airdrop Coins", icon: <RiBitCoinLine />, field: 'bn_airdrop_coin', isCoin: true },
    { title: "Planet Upgrade Earning", icon: <BsCoin />, field: 'planetUpgradeEarningAmt', isCurrency: true },
    { title: "Airdrop Refer Coin", icon: <RiBitCoinLine />, field: 'bn_airdrop_refer_coin', isCoin: true },
    { title: "Total Earning", icon: <RiBitCoinLine />, field: 'totalEarning', isCurrency: true },
    { title: "Total BN Coin", icon: <BsCoin />, field: 'totalBnCoin', isCoin: true },
    { title: "Planet Autopool Earning", icon: <BsCoin />, field: 'planetAutoPoolEarning'},
    { title: "BN Reward Coin", icon: <BsCoin />, field: 'bn_reward_coin', isCoin: true },
    { title: "Universe Club A Global Earning", icon: <BsCoin />, field: 'Club_A_Global_Earning' },
    { title: "My Laps/Lost Earning", icon: <BsCoin />, field: 'myLaps' },
    { title: "Universe Club A Tier Earning", icon: <BsCoin />, field: 'Club_A_Tier_Earning' },

  ];

  return (
    <div className='grid grid-cols-1 w-full xl:grid-cols-2'>
      {dataDisplay.map((data, index) => (
        <div key={index} className='flex items-center justify-between w-full px-2 py-6 border-b-[.5px] border-b-zinc-600 md:border-r md:border-r-zinc-600'>
          <div className='flex items-center gap-x-2'>
            <span className="text-yellow-500 text-3xl">{data.icon}</span>
            <span className='text-md md:text-sm xl:text-sm 2xl:text-md 3xl:text-xl'>{data.title}</span>
          </div>
          <div>
            <span className='text-sm md:text-xs xl:text-md 2xl:text-[14px] text-stone-400'>
              {portfolioInfo ? (data.isCoin ? `${portfolioInfo[data.field] || 'NA'}   BN Coin` : (data.isCurrency ? `$ ${portfolioInfo[data.field] ? portfolioInfo[data.field].toLocaleString() : 'NA'}` : `${portfolioInfo[data.field] || 'NA'}`)) : 'NA'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Protfolio;
