'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ClubAStructure from './ClubAStructure'
import Progressbar from './Progressbar'
import { RiGroupLine } from 'react-icons/ri';
import { ClubAStructureData } from '@/utils/ClubAStructureList';
import { Progress } from '@/components/ui/progress';


interface ClubACompType{
  PlanetName:string;
  PlanetPrice:number;
  Members:number;
  centerImg : string;
  orangeImg:string;
  sil1Img:string;
  sil2Img:string

}


const ClubAComp = ({PlanetName,PlanetPrice,Members,centerImg,orangeImg,sil1Img,sil2Img}:ClubACompType ) => {
   const [value,setValue] = useState<number>(20);
  


  return (
    <div className='w-[21rem] md:w-[16rem] xl:[15rem] 2xl:w-[95%] bg-[#262626] rounded-md  '>
        <div className='flex items-center justify-between py-2 px-2'>
          <span>{PlanetName} {PlanetPrice}$</span>
           <span className='mr-5'>1 Cycles</span>
          <span className='flex items-center'>{Members} <RiGroupLine /></span>
        </div>
        <div>
        
         
           <ClubAStructure

           centerImg={centerImg}
           ornageImg={orangeImg}
           sil1Img={sil1Img}
           sil2Img={sil2Img}
          
           />
      
         </div>

          <div className='py-3 px-2 relative'>
            <Progress  value={value}/>
            <div className={`absolute top-1 right-[1%]`}>{value}%</div>
           </div>

    </div>
  )
}

export default ClubAComp