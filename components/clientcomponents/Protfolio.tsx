import { portfolioData } from '@/utils/ProtfolioData'
import React from 'react'

const Protfolio = () => {
  return (
    <div className='grid grid-cols-2 '>
      {
        portfolioData.map((data) =>(
            <div key={data.id} className='flex items-center justify-between  py-8 px-2 border-b-[.5px] border-b-zinc-600 border-r border-r-zinc-600'>
          <div className='flex gap-x-2'>
          <span className="text-yellow-500 text-3xl">{data.icon}</span>
           <span className='text-xl font-normal '>{data.title}</span>
          </div>
           <div>
           <span className='text-md text-stone-400'>{data.value}</span>
           </div>
           
            </div>
        ))
      }
        
    </div>
  )
}

export default Protfolio