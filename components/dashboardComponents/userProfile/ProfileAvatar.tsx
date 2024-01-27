import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import UserInfo from '@/components/clientcomponents/UserInfo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegCopy } from 'react-icons/fa'

const ProfileAvatar = () => {
  return (
  <>
    <div className=''>
        <Image
        src='/Pluto.png'
        alt='Pluto.png'
        loading='lazy'
        height={300}
        width={300}
        />
    </div>

    <div className='flex  items-center justify-center gap-x-3 w-auto lg:w-full bg-yellow-500 rounded-md px-[20%]  sm:px-28 md:px-16   py-1'>
      <p>Copy Referrel link </p> 
      <span><FaRegCopy /></span>
    </div>
    <div className='pt-5 lg:w-full'>
      <UserInfo/>
                  
    </div>
  </>


  )
}

export default ProfileAvatar