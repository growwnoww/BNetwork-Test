import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import UserInfo from '@/components/clientcomponents/UserInfo'
import Image from 'next/image'
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

    <div className='flex  items-center gap-x-3 bg-yellow-500 px-8 rounded-md sm:px-24   py-1'>
      <p>Copy Referrel link </p> 
      <span><FaRegCopy /></span>
    </div>
    <div className='pt-5 '>
      <UserInfo/>
    </div>
  </>


  )
}

export default ProfileAvatar