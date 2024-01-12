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

    <div>
         <BtnWrapper text="Copy Referral Link" height="py-2" width="px-24" icon={<FaRegCopy />}/>
    </div>
    <div className='pt-5'>
      <UserInfo/>
    </div>
  </>


  )
}

export default ProfileAvatar