
import { IoIosLock } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { LuSun   } from 'react-icons/lu';
import { SiBitcoinsv } from 'react-icons/si';
import { TbUniverse } from 'react-icons/tb';

interface MenuItem {

  title: string;
  link: string;
 
}

const HomeMenu:MenuItem[] = [
  {
    title: "Home",
    link: "/",
},
{
    title: "Statistics",
    link: "#statistics",
},

{
    title: "Roadmap",
    link: "#roadmap",
},

{
    title: "How it works",
    link: "/howitworks",
},
{
    title:"Smart Contract",
    link:"/smartcontractinfo"
},

{
    title: "FAQ",
    link: "#faq",
},
 

];

export { HomeMenu };
