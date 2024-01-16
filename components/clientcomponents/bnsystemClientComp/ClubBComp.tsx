import React from 'react'
import { RiGroupLine } from 'react-icons/ri';
import ClubBStructure from './ClubBStructure';
import { Progress } from '@/components/ui/progress';

interface ClubBCompType {
    PlanetName: string;
    PlanetPrice: number;
    Members: number;
    centerImg: string;
    orangeImg: string;
    sil1Img: string;
    sil2Img: string;
    redImg: string;
    green1Img: string;
    green2Img: string;

}

const ClubBComp = ({ PlanetName, PlanetPrice, Members, centerImg, orangeImg, sil1Img, sil2Img, redImg, green1Img, green2Img }: ClubBCompType) => {
    return (
    <div className='bg-[#262626] rounded-md '>
        <div className='flex items-center justify-between py-2 px-2'>
          <span>{PlanetName} {PlanetPrice}$</span>
           <span className='mr-5'>1 Cycles</span>
          <span className='flex items-center'>{Members} <RiGroupLine /></span>
        </div>

         <ClubBStructure
          centerImg={centerImg}
          ornageImg={orangeImg}
          sil1Img={sil1Img}
          sil2Img={sil2Img}
          redImg={redImg}
          green1Img={green1Img}
          green2Img={green2Img}
          
         />



         <div className='py-3 px-2 relative'>
           <Progress  value={33}/>
           <div className={`absolute top-1 right-[1%]`}>{33}%</div>
          </div>
    </div >
  )
}

export default ClubBComp