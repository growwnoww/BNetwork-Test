'use client'
import React from 'react'
import Chart from "react-apexcharts"
import styled from 'styled-components'

const PieChartDemo = () => {
   
  return (
    <div className=' rounded-2xl border-neutral-500 border-opacity-45 px-9   text-white border mt-4'  >

<p className='text-center text-xl font-semibold py-2'>BN Coin Distribution</p>


     <Chart
     type='pie'
     width={500}
     height={500}
     
    

     series={[1,5,14,20,19,40]
    
     }

     

     options={
        {
            labels:['BN Airdrop',"BN Reward","Exchange","BN CBN Mining","Stakig Income","ICO Pre sale"],
            
        }
     }
    
      
     >


     </Chart>


    </div>
  )
}

export default PieChartDemo