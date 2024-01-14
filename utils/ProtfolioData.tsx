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
        title:"BN AIRDROP COINS",
        value:"4619.30 / 5000 BN Coin",
        icon:<RiBitCoinLine />

    },
    {
        id:3,
        title:"BN ENERGY TOKENS",
        value:"11996.330",
        icon:<MdOutlineOfflineBolt />

    },
    {
        id:4,
        title:"Direct Income",
        value:"$ 82.50",
        icon:<BsCoin />
    },
    {
        id:5,
        title:"Planet Upgrade Income",
        value:"$ 2182.50 ",
        icon: <BsCoin />
    },
    {
        id:6,
        title:"Tier Income",
        value:"$ 2182.50",
        icon:<BsCoin />
    },
    {
        id:7,
        title:"Autopool Planet Income",
        value:"$ 2182.50",
        icon:<BsCoin />
    },
    {
        id:8,
        title:"Total Income",
        value:"$ 2182.50",
        icon:<BsCoin />
    },
    {
        id:9,
        title:"Airdrop Coin",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    {
        id:10,
        title:"Airdrop Refer Coin",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    {
        id:11,
        title:"BN Coin Reward",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    {
        id:12,
        title:"Total BN Coin",
        value:"$ 2182.50",
        icon: <RiBitCoinLine />
    },
    
]

export{portfolioData}