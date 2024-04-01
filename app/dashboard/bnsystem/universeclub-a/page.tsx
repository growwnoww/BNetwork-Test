'use client'
import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import ClubAComp from '@/components/clientcomponents/bnsystemClientComp/ClubAComp'
import React, { useContext, useEffect, useState } from 'react'
import { ClubAPackageList } from '../../../../utils/CLubAPackages';
import axios from 'axios';
import { WalletContext } from '@/context/WalletContext';

interface clubAInfo{
  planetName:string;
  totalUserLength:number;
  recycle:number;
  globalCount:number;
}

const Page = () => {
  const walletContext = useContext(WalletContext);
  const userAddress = walletContext?.userAddress;
  const [userCount,setUserCount] = useState<clubAInfo[]>([ { planetName: 'Earth', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Moon', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Mars', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Mercury', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Venus', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Jupiter', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Saturn', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Uranus', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Neptune', totalUserLength: 0, recycle: 0, globalCount: 0 },
  { planetName: 'Pluto', totalUserLength: 0, recycle: 0, globalCount: 0 },

])

  const getRecycleAndUserCount = async () =>{
    try {
      const response = await axios.get<clubAInfo[]>(`${process.env.NEXT_PUBLIC_URL}/clubA/getRecycleAnadMember/${userAddress}`);

      if(response.data){
        const data :clubAInfo[] = response.data;
        setUserCount(data)
        
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getRecycleAndUserCount()
  },[])
  return (
    <div>
     <div className='w-fit ml-10 my-4  '>
      <BtnWrapper text='Back' height='py-1' width='px-4' path='/dashboard/bnsystem/'/>
      </div>

      <div>
        <HeadingWrapper text="Club A Global Matrix"/>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 place-items-center gap-x-4 gap-y-5 mx-4 mt-5'>
       {
        userCount && userCount.map((item,index) =>(
         <div key={index}>
           <ClubAComp
            PlanetName={item.planetName}
            Members={item.totalUserLength}
            Recycle={item.recycle}
            globalCount={item.globalCount}
           
            />
         </div>
        ))
       }
      </div>

    </div>
  )
}

export default Page