'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';


interface NavItem {
    title: string;
    link: string;
  }

const navList:NavItem[] = [
    {
        title:"Home",
        link:"#home"
    },
    {
        title:"All Services",
        link:"#allservice"
    },
    {
        title:"Roadmap",
        link:"#roadmap"
    },
    {
        title:"Statistics",
        link:"#statistics"
    },
    {
        title:"How it works",
        link:"#howitworks"
    },
    {
        title:"Review",
        link:"#review"
    },
    {
        title:"FAQ",
        link:"#faq"
    },

]

const Navbar = () => {
    const [activeNav,setActiveNav] = useState<String>('#home')
  return (
    <div className='w-full h-[70px] fixed top-0 shadow-lg shadow-[#2A0E61]/50  bg-[#03001417] backdrop-blur-md z-50 px-10'>
       <div className='w-full h-full flex flex-row items-center text-xs font-semibold'>
           <div>
            <Image
            src='/logo.png'
            alt='logo'
            loading='lazy'
            width={100}
            height={50}
            />
           </div>
           {
            navList.map((NavRoute,index) =>(
                <div key={index} className={`px-3 ${activeNav === NavRoute.link? 'text-yellow-400':''}`}>
                   <a href={NavRoute.link} onClick={()=>setActiveNav(NavRoute.link)}>{NavRoute.title}</a>
                </div>
            ))
           }
           <div className='ml-auto flex items-center gap-5 '>
           <div className='bg-yellow-500 px-3  py-2.5 rounded-md'>
            <p>Connect Wallet</p>
           </div>
         
           <div className='bg-gray-800 px-3 py-1 rounded-md'>
            ENG 
           </div>
           </div>
           
       </div>
      
    </div>
  )
}

export default Navbar