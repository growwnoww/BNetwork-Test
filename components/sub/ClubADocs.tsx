import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ClubADocs = () => {
  return (
    <div className='bg-stone-800 w-full lg:w-auto h-auto flex flex-col lg:flex-row  mx-24 rounded-lg mt-20'>
    <div className='lg:w-1/3  bg-black rounded-lg  m-5 h-[20rem] flex items-center justify-center'>
      <Image
      src="/BELIEVE-LOGO-13.png"
      alt="coin_front"
      height={300}
      width={300}
      loading='lazy'
      />
    </div>
    <div className='lg:w-3/4 bg-black mx-3 my-6 py-3 lg:m-5 lg:h-[20rem] rounded-lg flex flex-col items-start pl-5 gap-y-3'>
      <div className='py-2'>
        <p className='text-4xl lg:text-5xl font-bold'>Universe Club-A</p>
      </div>
      <div>
        <p className='text-md lg:text-lg'>Download Universe Club-A pdf</p>
      </div>
      <div>
      <Link className='bg-yellow-500 px-2 py-2 rounded-md font-semibold' href="/Club-A_PDF.pdf" target="_blank" rel="noopener noreferrer">
          View PDF
        </Link>
      </div>
    </div>
    </div>
  )
}

export default ClubADocs