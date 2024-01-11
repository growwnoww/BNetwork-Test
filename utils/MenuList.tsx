import { FaChartLine } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { LuSun   } from 'react-icons/lu';
import { SiBitcoinsv } from 'react-icons/si';
import { TbUniverse } from 'react-icons/tb';

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

const MenuList = [
  {
    id: "1",
    title: "Home",
    path: "/dashboard",
    icon: <IoHomeOutline/>,
  },
  {
    id: "2",
    title: "BN System",
    path: "/bnsystem",
    icon: <LuSun />,
  },
  {
    id: "3",
    title: "Universe",
    path: "/universe",
    icon: <TbUniverse />,
  },
  {
    id: "4",
    title: "BN coin",
    path: "/bncoin",
    icon: <SiBitcoinsv />,
  },
  {
    id: "5",
    title: "Live Planet Status",
    path: "/live-planet-status", // Corrected path to make it unique
    icon: <FaChartLine />,
  },
];

export { MenuList };
