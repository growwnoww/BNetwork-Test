import Image from 'next/image'
import React from 'react'
import "../../../app/globals.css"
import Link from 'next/link';

interface PlanetUpPropsTypes {
  imgURL: string;
  packageName: string;
  packagePrice: number;
  treePath: string;
  chartPath: string;
}

const PlanetUpPackage = ({ imgURL, packageName, packagePrice, treePath, chartPath }: PlanetUpPropsTypes) => {
  return (
    <div className='relative z-0  flex flex-col bg-zinc-800 rounded-md  m-2 mx-5'>
      <div className=' flex items-center justify-between w-full px-2 py-3 '>
        <div className='text-xl flex items-start justify-start'>
          <p>{packageName} <span>{packagePrice}$</span></p>
        </div>
       
        </div>

       <div className='z-10 absolute top-[39%] right-[30%] flex flex-col items-center text-xl font-semibold'>
         <span className='text-3xl'>{packagePrice}$</span>
          <button className='bg-yellow-500 py-2 px-8  rounded-md hover:bg-yellow-600 duration-300'>Activate</button>
        </div>
      <div className='flex items-center justify-center bg-black  py-10 px-10 opacity-40 blur-[2px]' >
        <Image
          src={imgURL}
          alt={imgURL}
          height={packageName == 'Saturn'?250:150}
          width={packageName == 'Saturn'?250:150}
          loading='lazy'
          className={`${packageName == 'Saturn'? '':'custom-spin'}`}
        />
      </div>


    
    
       
       <div className='flex items-center justify-between px-4 w-full gap-x-3 py-3  text-md'>
        <Link href={chartPath} className='bg-yellow-500 py-2 px-5  rounded-md hover:bg-yellow-600 duration-300'>View Chart</Link>
        <Link href={treePath} className='bg-yellow-500 py-2 px-5 rounded-md hover:bg-yellow-600 duration-300'>View Tree</Link>
       </div>
       
    </div>

  )
}

export default PlanetUpPackage