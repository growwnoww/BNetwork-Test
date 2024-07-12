import React from 'react'
import { FaFileContract } from "react-icons/fa6";
import { Button, MovingBorder } from '../ui/moving-border';
import { MovingBorderDemo } from './MovingBtn';
import { HoverBorderGradientDemo } from './HoverBorder';


const SmatContractContainer = () => {
  return (
    <div>
        
        <div className='relative flex items-center justify-center -translate-y-48 lg:-translate-y-24'>
            <div className='absolute inset-1 h-full  lg:w-[33rem] lg:h-[15rem] bg-gradient-to-r from-yellow-400 to-yellow-500 transform scale-[0.80] bg-yellow-500 rounded-full blur-3xl opacity-40 flex -translate-y-5 3xl:translate-x-12 lg:left-1/3'>  </div>
            <div className='relative  flex flex-col items-center justify-center border border-zinc-700 w-[20rem] lg:w-[59rem] lg:h-[20rem] px-5 backdrop-blur-md rounded-3xl py-4 '>
            <div><FaFileContract  className='text-7xl lg:text-9xl text-yellow-500' /></div>
            <p className='text-xl lg:text-3xl text-center font-semibold py-2'>Smart Contracts </p>
            <p className='text-sm lg:text-lg opacity-45 text-center'>Explore the contracts for all Believe Network Products here.</p>

            <HoverBorderGradientDemo/>
      
            </div>
        </div>
    </div>
  )
}

export default SmatContractContainer