'use client'
import { MenuList } from '@/utils/MenuList'
import { NestedMenuList } from '@/utils/NestedMenuList'
import Image from 'next/image'
import React, { useState } from 'react'



const Sidebar = () => {
  const [openSubMenuId, setOpenSubMenu] = useState<String | null>(null);

  const toggleSubMenu = (menuId: String) => {
    setOpenSubMenu(prevId => (prevId === menuId ? null : menuId))
  }

  return (
    <div className='h-screen w-72 border-r-[.5px] border-r-slate-800'>

      <div className='flex items-center border-b-[.5px] border-b-slate-800 h-16'>
        <Image
          src='/BNSymbol.png'
          alt='BNSymbol'
          height={60}
          width={60}
          loading='lazy'
        />
      </div>

      <div className='mt-6'>
        <ul className='flex flex-col p-3 pl-5 text-stone-400 text-md font-medium'>
          {
            MenuList.map((menu) => (
              <li key={menu.id} className='flex items-center pb-5 gap-x-3 cursor-pointer'>
                <span className='text-lg'>{menu.icon}</span>
                <p>{menu.title}</p>
              </li>

            ))
          }

          {
          NestedMenuList.map((menu) => (
            <li key={menu.id} className='pb-5  cursor-pointer'>
              <div onClick={() => toggleSubMenu(menu.id)} className='flex items-center gap-x-3'>
                <span className='text-lg'>{menu.icon}</span>
                <p>{menu.title}</p>
              </div>
              {openSubMenuId === menu.id && (
                <ul className='pt-2 pl-4'>
                  {menu.list.map((item, index) => (
                    <li key={index} className='flex items-center gap-x-2 pb-2'>
                      <span>{item.icon}</span>
                      <p>{item.title}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Sidebar