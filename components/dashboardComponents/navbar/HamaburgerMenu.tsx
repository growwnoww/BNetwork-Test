'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { NestedMenuList } from "@/utils/NestedMenuList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageList } from "@/utils/languagelist";
import { GrLanguage } from 'react-icons/gr';
import CurrentBalanceComp from '@/components/clientcomponents/CurrentBalanceComp';
import { MenuList } from '@/utils/MenuList';

const HamaburgerMenu = ({isOpen}:{isOpen:boolean}) => {
   
   

    const [menuState, setMenuState] = useState<{
      [id: number]: { isOpen: boolean; isArrowUp: boolean };
    }>({});
  
    const toggleMenu = (menuId: number) => {
      setMenuState((prev) => {
        const isOpen = !prev[menuId]?.isOpen || false;
        const updatedMenuState = { ...prev };
        updatedMenuState[menuId] = {
          isOpen: isOpen,
          isArrowUp: !prev[menuId]?.isArrowUp,
        };
        return updatedMenuState;
      });
    };
  


  return (
    <>
         {isOpen ? (
        <div className="absolute top-[100%] left-[1%]  mr-3 px-4 right-[1%] bg-black py-3 my-3  w-full">
          <div>
            <CurrentBalanceComp />
          </div>

          <div className="flex items-center gap-x-3 my-4">
            <div>
              <GrLanguage className="text-zinc-500 text-xl " />
            </div>
            <div className="w-fit">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                 {
                  languageList.map((lang) => (
                    <SelectItem key={lang.id} value={lang.value}>{lang.name}</SelectItem>
                  ))
                 }
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="">
            <ul className="grid grid-cols-2 gap-2">
              {MenuList.map((item) => (
                <li
                  key={item.id}
                  className="bg-stone-800 rounded-md  flex items-center justify-center"
                >
                  <Link href={item.path} className=" py-2">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="bg-stone-800 rounded-md">
                <Link
                  href="/dashboard/updateprofile"
                  className={`flex items-center justify-center  px-2 py-2 rounded-md mr-4 gap-x-3`}
                >
                  <p>Update Profile</p>
                </Link>
              </li>
            </ul>

            <ul className="grid grid-cols-1 gap-2 place-items-center mt-2">
              {NestedMenuList.map((item) => (
                <li key={item.id} className=" w-full py-2  bg-stone-800 rounded-md ">
                  <div 
                    onClick={() => toggleMenu(item.id)}
                    className=" flex items-center justify-between px-4  "
                  >
                    <p>{item.title}</p>
                    <p>
                      {menuState[item.id]?.isArrowUp ? item.icon2 : item.icon1}
                    </p>
                  </div>

                  {menuState[item.id]?.isOpen && (
                    <ul>
                      {item.list.map((menu, index) => (
                        <li key={index} className="ml-5 py-2">
                          <Link href={menu.path} className="flex items-center">
                            <span>{menu.icon}</span>
                            <span>{menu.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default HamaburgerMenu