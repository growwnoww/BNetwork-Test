
import { IoIosLock } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { LuSun   } from 'react-icons/lu';
import { SiBitcoinsv } from 'react-icons/si';
import { TbUniverse } from 'react-icons/tb';

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  icon2?:React.ReactNode;
}

const HomeMenu:MenuItem[] = [
  {
    id: "1",
    title: "Home",
    path: "/",
    icon: <IoHomeOutline/>,
  },
  {
    id: "2",
    title: "Roadmap",
    path: "/",
    icon: <LuSun />,
  },
  {
    id: "3",
    title: "Statistics",
    path: "/",
    icon: <TbUniverse />,
    // icon2:<IoIosLock />
  },
  {
    id: "4",
    title: "How It Works",
    path: "/howitworks",
    icon: <SiBitcoinsv />,
    // icon2:<IoIosLock />

  },
  {
    id: "5",
    title: "Calculator",
    path: "/",
    icon: <SiBitcoinsv />,
    // icon2:<IoIosLock />

  },
  {
    id: "6",
    title: "FAQ",
    path: "/",
    icon: <SiBitcoinsv />,
    // icon2:<IoIosLock />

  }
 

];

export { HomeMenu };
