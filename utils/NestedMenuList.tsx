import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';
import { IoMdArrowDropright } from 'react-icons/io';
import React from 'react';

interface NestedMenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface NestedMenuType {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  list: NestedMenuItem[];
}

const NestedMenuList: NestedMenuType[] = [
  {
    id: "1",
    title: "My team",
    path: "",
    icon: <HiUserGroup />,
    list: [
      {
        title: "Direct Team",
        path: "/directteam",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Tier Team",
        path: "/tierteam",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Tier Upline Team",
        path: "/tieruplineteam",
        icon: <IoMdArrowDropright />,
      },
    ],
  },
  {
    id: "2",
    title: "Activation",
    path: "/bncoin",
    icon: <BsReverseLayoutTextSidebarReverse />,
    list: [
      {
        title: "Plan Transaction History",
        path: "/plantranxhistory",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Create New Believer",
        path: "/createnewbeliever",
        icon: <IoMdArrowDropright />,
      },
    ],
  },
  {
    id: "3",
    title: "My Earnings",
    path: "/bncoin",
    icon: <GiReceiveMoney />,
    list: [
      {
        title: "Direct Earnings",
        path: "/directearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Tier Earnings",
        path: "/tierearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Planet Upgrade Earnings",
        path: "/planetupearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "BN Coin Earnings",
        path: "/bncoinearnings",
        icon: <IoMdArrowDropright />,
      },
      {
        title: "Auto Pool Earnings",
        path: "/autopoolearnings",
        icon: <IoMdArrowDropright />,
      },
    ],
  },
];

export { NestedMenuList };
