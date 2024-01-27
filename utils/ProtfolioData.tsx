import React from 'react'
import { BsCoin } from 'react-icons/bs';
import { MdOutlineOfflineBolt } from 'react-icons/md';
import { RiBitCoinLine } from 'react-icons/ri';
import { TbCoin } from 'react-icons/tb';

interface ProfolioType{
    id:number;
    title:string;
    value:string;
    icon: React.ReactNode
}

const portfolioData:ProfolioType[] = [
    {
        id:1,
        title:"BN REWARD COINS",
        value:"27948.70 / 30,000 BN Coin",
        icon: <RiBitCoinLine />
    },
    {
        id:2,
        title:"Direct Earning",
        value:"4619.30 / 5000 BN Coin",
        icon:<BsCoin />
    },
    {
        id:3,
        title:"BN AIRDROP COINS",
        value:"4619.30 / 5000 BN Coin",
        icon:<RiBitCoinLine />

    },
    {
        id:4,
        title:"Tier Earning",
        value:"$ 82.50",
        icon:<BsCoin />
    },
    {
        id:5,
        title:"Airdrop Coin",
        value:"$ 2182.50 ",
        icon: <RiBitCoinLine />
    },
    {
        id:6,
        title:"Planet Upgrade Earning",      
        value:"$ 2182.50",
        icon:<BsCoin />
    },
    {
        id:7,
        title:"BN Reward Coin",
        value:"$ 2182.50",
        icon:<RiBitCoinLine />
    },
    {
        id:8,
        title:"Planet Autopool Earning",
        value:"$ 2182.50",
        icon:<BsCoin />
    },
    {
        id:9,
        title:"BN Airdrop Refer Coin",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    {
        id:10,
        title:"Universe Club A Global Earning",
        value:"$ 2182.50",
        icon: <BsCoin />
    },
    {
        id:11,
        title:"Total BN Coin",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    {
        id:12,
        title:"Universe Club A Tier Earning",
        value:"$ 2182.50",
        icon: <BsCoin />
    },
    {
        id:13,
        title:"My Laps/Lost Earning",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    {
        id:14,
        title:"My Total Eanring",
        value:"$ 2182.50",
        icon: <BsCoin />
    },
    
]

export{portfolioData}