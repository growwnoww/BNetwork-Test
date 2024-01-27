import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import Protfolio from '@/components/dashboardComponents/Protfolio'
import PlatformLatestAct from '@/components/dashboardComponents/userProfile/PlatformLatestAct'
import ProfileAvatar from '@/components/dashboardComponents/userProfile/ProfileAvatar'
import Top10Rec from '@/components/dashboardComponents/userProfile/Top10Rec'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col md:flex-row overflow-y-visible'>
    <div className='flex flex-col items-center md:w-2/4 lg:w-2/4 xl:w-1/3 2xl:w-1/3 justify-cente rounded-md bg-[#151515] px-5 m-5 sm:px-2  py-4 sm:mt-5 md:m-2'>
    <ProfileAvatar/>
    <Top10Rec/>
    </div>
    <div className='bg-[#151515] sm:w-2/3  md:w-3/4  2xl:w-3/4  m-5 sm:mt-5 md:m-2  rounded-md'>
      <div className='w-full bg-zinc-800 py-4 rounded-md text-2xl px-2'>Portfolio</div>
     <Protfolio/>

     <div className='flex items-center mt-5 m-3 justify-between bg-[#282828] py-8 rounded-md px-3 '>
      <span className='text-lg md:text-3xl'>Believe Network System</span>
      <Link href="/dashboard/bnsystem" className='w-fit'>
        <BtnWrapper text='More Info' height='py-3 xl:py-2' width='px-5 xl:px-10'/>
      </Link>
     </div>

     <PlatformLatestAct/>
    </div>
    </div>
  )
}

export default page