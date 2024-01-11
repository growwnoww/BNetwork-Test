import DashboardNavbar from '@/components/dashboardComponents/navbar/DashboardNavbar'
import Sidebar from '@/components/dashboardComponents/sidebar/Sidebar'
import React from 'react'



const Dashboardlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-row'>
        <div>
            <Sidebar/>
        </div>
        <div className=''>
            <DashboardNavbar/>
            {children}
        </div>
    </div>
  )
}

export default Dashboardlayout