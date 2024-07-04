import { title } from 'process';
import { FaChartLine } from 'react-icons/fa';
import { GrUserNew } from 'react-icons/gr';
import { IoIosLock } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { LuSun   } from 'react-icons/lu';
import { SiBitcoinsv } from 'react-icons/si';
import { TbUniverse } from 'react-icons/tb';

interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon: React.ReactNode;
  icon2?:React.ReactNode;
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
    path: "/dashboard/bnsystem",
    icon: <LuSun />,
  },
  {
    id: "3",
    title: "Universe",
    path: "/dashboard/bnsystem/universeclub-a",
    icon: <TbUniverse />,

  },
  
 
];

export { MenuList };
