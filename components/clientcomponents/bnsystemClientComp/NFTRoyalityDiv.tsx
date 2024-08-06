import LevelIcon from '@/components/dashboardComponents/LevelIcon'
import React from 'react'
import BtnWrapper from '@/components/WrapperComponent/BtnWrapper';
import { IoIosUnlock } from 'react-icons/io';

const NFTRoyalityDiv = () => {
  const levels = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <div className='bg-[#1f1f1f] flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between py-8 m-3 rounded-md'>
         <div className="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl  px-3"> NFT Royalty &#40;comming soon&#41;</div>
       <div className='flex flex-col lg:flex-row gap-y-5 lg:gap-y-0 items-center justify-between mr-0 lg:mr-10 gap-x-40'>
       <div className='h-fit grid grid-cols-3 w-fit gap-x-2 '>
       {levels.map((index) => (
            <LevelIcon key={index} level={index } id={`NFT-level-${index + 1}`} context="NFT"/>
          ))}
         

          
        </div>
        <div className="flex items-center relative">
            <BtnWrapper
              text="Show"
              height="py-2"
              width="px-10"
              path='/dashboard/bnsystem/royalty_nft'
            />
            {/* <IoIosUnlock className="absolute right-[10%]" /> */}
          </div>
       </div>

        
</div>
  )
}

export default NFTRoyalityDiv