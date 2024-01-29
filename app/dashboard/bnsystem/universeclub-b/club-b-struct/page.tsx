'use client'
import Image from 'next/image'
import React from 'react'


const page = () => {




  return (
    <div className='w-fit m-5'>
      <div className='w-full flex items-center justify-between bg-neutral-800 py-2 lg:py-8 px-3 rounded-tr-md rounded-tl-md'>
        <div>
          <div className='flex gap-x-5 text-lg lg:text-xl'>
            <p className=''>Level 1</p>
            <span className=''> 5 $</span>
          </div>
          <div>33% completed</div>
        </div>
        <div className='hidden lg:flex gap-x-8'>
          <div className='text-center'>
            <span className='text-yellow-400 opacity-60'>Net Profit per cycle </span>
            <p className='font-semibold text-xl'>15 $</p>
          </div>

          <div className='hidden lg:block'>
            <span className='text-yellow-400 opacity-60'>Level Revenue</span>
            <p className='font-semibold text-xl'>32211.0 $</p>
          </div>
        </div>
      </div>


      <div className='relative w-full  h-fit mt-5' >
        <Image
          src='/circle1.svg'
          alt='circle'
          height={700}
          width={700}
          loading='lazy'
          layout='responsive'
          className='w-full px-12'
        />

        <div className='absolute top-[27%] left-[31%]'>
         <p className="border-2 border-gray-600  bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 " data-tippy-directive="" tabIndex={0}>
          <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '24px', height: '31px' }}
         >
          <path d="M12 0L12 24M0 12L24 12" stroke="#666666" fill='#122143' strokeWidth="2" />
         </svg>
          </p>
        </div>

        <div className='absolute top-[27%] right-[31%]  w-fit'>
          <Image
          src='/BNSymbol.png'
          alt='BNsymbol'
          height={30}
          width={30}
          className='w-fit border-2 border-gray-600 px-1  bg-black rounded-full hover:border-yellow-400 duration-300'
          />
        </div>

        <div className='absolute top-[29%] right-[46%]  w-fit'>
          <Image
          src='/BNSymbol.png'
          alt='BNsymbol'
          height={45}
          width={48}
          className='w-fit border-2 border-gray-600 px-[8px]  bg-black rounded-full hover:border-yellow-400 duration-300'
          />
        </div>

        <div className='absolute top-[44%] right-[45%]  w-fit'>
          <Image
          src='/BNSymbol.png'
          alt='BNsymbol'
          height={50}
          width={50}
          className='w-fit border-2 border-gray-600 px-[10px]  bg-black rounded-full hover:border-yellow-400 duration-300'
          />
        </div>

        <div className='absolute top-[62%] right-[46%]  w-fit'>
          <Image
          src='/BNSymbol.png'
          alt='BNsymbol'
          height={45}
          width={48}
          className='w-fit border-2 border-gray-600 px-[8px]  bg-black rounded-full hover:border-yellow-400 duration-300'
          />
        </div>

        <div className='absolute top-[67%] right-[31%]  w-fit'>
          <Image
          src='/BNSymbol.png'
          alt='BNsymbol'
          height={30}
          width={30}
          className='w-fit border-2 border-gray-600 px-1  bg-black rounded-full hover:border-yellow-400 duration-300'
          />
        </div>

        <div className='absolute top-[67%] left-[31%]'>
         <p className="border-2 border-gray-600  bg-black  w-fit rounded-full py-1 px-2 hover:border-yellow-400 duration-300 " data-tippy-directive="" tabIndex={0}>
          <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '24px', height: '31px' }}
         >
          <path d="M12 0L12 24M0 12L24 12" stroke="#666666" fill='#122143' strokeWidth="2" />
         </svg>
          </p>
        </div>

      </div>

    </div>
  )
}

export default page
