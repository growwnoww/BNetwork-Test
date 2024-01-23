import { portfolioData } from '@/utils/ProtfolioData'
import React from 'react'

const Protfolio = () => {
  return (
    <div className='grid grid-cols-1 w-full md:grid-cols-2 '>
      {
        portfolioData.map((data) =>(
            <div key={data.id} className='flex items-center justify-between w-full px-2  py-6 border-b-[.5px] border-b-zinc-600 md:border-r md:border-r-zinc-600'>
          <div className='flex gap-x-2'>
          <span className="text-yellow-500 text-3xl">{data.icon}</span>
           <span className='text-md md:text-xl first-letter: font-normal '>{data.title}</span>
          </div>
           <div>
           <span className='text-sm text-stone-400'>{data.value}</span>
           </div>
           
            </div>
        ))
      }
        
    </div>
  )
}

export default Protfolio