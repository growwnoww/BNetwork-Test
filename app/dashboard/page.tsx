import ProfileAvatar from '@/components/dashboardComponents/userProfile/ProfileAvatar'
import React from 'react'

const page = () => {
  return (
    <div className='flex '>
    <div className='flex flex-col items-center justify-cente rounded-md bg-[#262626] px-5 py-4 m-5'>
    <ProfileAvatar/>
    </div>
    <div className='bg-[#262626] w-3/4 h-80 m-5'>

    </div>
    </div>
  )
}

export default page