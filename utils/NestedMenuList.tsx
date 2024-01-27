import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDropright } from 'react-icons/io';
import React from 'react';

interface NestedMenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface NestedMenuType {
  id: number;
  title: string;

  icon: React.ReactNode;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  list: NestedMenuItem[];
}

const NestedMenuList: NestedMenuType[] = [
  {
    id: 1,
    title: "My team",
    icon: <HiUserGroup />,
    icon1: <IoIosArrowDown />,
    icon2:<IoIosArrowUp />,
    list: [
      {
        title: "Tier Upline Team",
        path: "/dashboard/tieruplineteam",
        icon: <IoMdArrowDropright />,
      },
    ],
  },
  {
    id: 2,
    title: "Activation",
    icon: <BsReverseLayoutTextSidebarReverse />,
    icon1: <IoIosArrowDown />,
    icon2:<IoIosArrowUp />,
    list: [
      {
        title: "Plan Transaction History",
        path: "/dashboard/plantranxhistory",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Create New Believer",
        path: "/dashboard/createnewbeliever",
        icon: <IoMdArrowDropright />,
      },
    ],
  },
  {
    id: 3,
    title: "P Upgrade Earnings",
    icon: <GiReceiveMoney />,
    icon1: <IoIosArrowDown />,
    icon2:<IoIosArrowUp />,
    list: [
      {
        title: "Direct Earnings ",
        path: "/dashboard/directearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Tier Earnings ",
        path: "/dashboard/tierearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Upgrade Earnings",
        path: "/dashboard/upgradeearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "BN Coin Earnings",
        path: "/dashboard/bncoinearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Auto Pool Earnings",
        path: "/dashboard/autopoolearnings",
        icon: <IoMdArrowDropright />,
      },
    ],
  },
  {
    id: 4,
    title: "U Club A Earnings",
    icon: <GiReceiveMoney />,
    icon1: <IoIosArrowDown />,
    icon2:<IoIosArrowUp />,
    list: [
      {
        title: "Club A Global Earnings",
        path: "/dashboard/clubAglobalearn",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Club A Tier Earnings",
        path: "/dashboard/clubAtierearn",
        icon: <IoMdArrowDropright />,
      },
     
    
    ],
  },
];

export { NestedMenuList };
