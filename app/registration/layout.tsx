import Navbar from '@/components/main/Navbar'
import StarsCanvas from '@/components/main/StarBackground'
import React, { Children } from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      
      <Navbar/>
      {children}
    </div>
  )
}

export default layout
