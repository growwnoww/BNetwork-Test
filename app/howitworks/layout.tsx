import Navbar from '@/components/main/Navbar'
import React from 'react'

const Workslayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
         <div>


            {children}
        
            
          </div>
    </div>
  )
}

export default Workslayout