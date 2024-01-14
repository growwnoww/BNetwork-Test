import LevelIcon from '@/components/dashboardComponents/LevelIcon'
import React from 'react'
import BtnWrapper from '@/components/WrapperComponent/BtnWrapper';

const NFTRoyalityDiv = () => {
  return (
    <div className='bg-[#1f1f1f] flex items-center justify-between py-8 m-3 rounded-md'>
        <div className='text-3xl  px-3'>NFT Royalty</div>
       <div className='flex items-center justify-center mr-10 gap-x-40'>
       <div className='h-fit grid grid-cols-3 w-fit gap-x-2 '>
          <LevelIcon level={1}/>
          <LevelIcon level={2}/>
          <LevelIcon level={3}/>
          <LevelIcon level={4}/>
          <LevelIcon level={5}/>
          <LevelIcon level={6}/>
         

          
        </div>
        <BtnWrapper text='show' height='py-2' width='px-10'/>
       </div>

        
</div>
  )
}

export default NFTRoyalityDiv