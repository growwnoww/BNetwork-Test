'use client'
import CurrentBalanceComp from '@/components/clientcomponents/CurrentBalanceComp'
import CurrentRouteHeading from '@/components/clientcomponents/CurrentRouteHeading'
import LanguageSelector from '@/components/clientcomponents/LanguageSelector'
import React from 'react'

const DashboardNavbar = () => {
 
  return (
    <div className='flex items-center justify-between h-16 border-b-[.5px] border-b-slate-800'>
      <div className='pl-4'>
       <CurrentRouteHeading/>
      </div>
      <div className='flex gap-x-5'>
        <CurrentBalanceComp/>
        <LanguageSelector/>
      </div>
    </div>
  )
}

export default DashboardNavbar