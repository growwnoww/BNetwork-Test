
import CurrentRouteHeading from '@/components/clientcomponents/CurrentRouteHeading'
import React from 'react'

const DashboardNavbar = () => {
 
  return (
    <div className='flex items-center h-16 w-screen border-b-[.5px] border-b-slate-800'>
      <div className='pl-4'>
       <CurrentRouteHeading/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default DashboardNavbar