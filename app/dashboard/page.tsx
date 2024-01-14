import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import Protfolio from '@/components/clientcomponents/Protfolio'
import ProfileAvatar from '@/components/dashboardComponents/userProfile/ProfileAvatar'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex overflow-y-visible'>
    <div className='flex flex-col items-center justify-cente rounded-md bg-[#262626] px-5 py-4 m-5'>
    <ProfileAvatar/>
    </div>
    <div className='bg-[#1a1b1b] w-3/4  m-5 rounded-md'>
      <div className='w-full bg-zinc-800 py-4 rounded-md text-2xl px-2'>Portfolio</div>
     <Protfolio/>

     <div className='flex items-center mt-5 m-3 justify-between bg-[#282828] py-8 rounded-md px-3'>
      <span className='text-3xl'>Believe Network System</span>
      <Link href="/dashboard/bnsystem" className='w-fit'>
        <BtnWrapper text='More Info' height='py-3' width='px-5'/>
      </Link>
     </div>
    </div>
    </div>
  )
}

export default page