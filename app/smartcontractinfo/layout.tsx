import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/main/Navbar'
import React from 'react'

const SmartContractInfoLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
         <div>
         
            {children}
        
            
         </div>
         <Footer/>
    </div>
  )
}

export default SmartContractInfoLayout