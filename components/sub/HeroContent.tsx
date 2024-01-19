"use client";

import React from 'react'
import {motion} from "framer-motion"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import {SparklesIcon} from '@heroicons/react/24/solid'
import Image from 'next/image';




const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
      <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px]  opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        
        </motion.div>
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Weclome to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400">
              {" "}
              Believe Networke Space Ecosystem {" "}
            </span>
          
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
         It is Based On The BNB (Smart Chain) SMART Contract 100% Decentralized System.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Learn More!
        </motion.a>
      </div>

      <div className="w-full h-full flex justify-center items-center">
      <div>
          <Image
          src='/b-coin.png'
          alt='b-coin image'
          loading='lazy'
          width={350}
          height={350}
          />
        </div>

      </div>
    </motion.div>
  )
};
 


export default HeroContent