'use client'
import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import ClubAComp from '@/components/clientcomponents/bnsystemClientComp/ClubAComp'
import React, { useContext, useEffect, useState } from 'react'
import { ClubAPackageList } from '../../../../utils/CLubAPackages';
import axios from 'axios';
import { WalletContext } from '@/context/WalletContext';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'

interface clubAInfo{
  planetName:string;
  totalUserLength:number;
  recycle:number;
  globalCount:number;
}

const Page = () => {
  const {address} = useWeb3ModalAccount();
  const userAddress = address
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
      const response = await axios.get<clubAInfo[]>(`${process.env.NEXT_PUBLIC_URL}/clubA/getRecycleAnadMember/${userAddress?.toLowerCase()}`);

      if(response.data){
        const backendData :clubAInfo[] = response.data;
        console.log("global Count",backendData)
        const mergedData = userCount.map(planet => {
          const backendPlanet = backendData.find(item => item.planetName === planet.planetName);
          return backendPlanet ? backendPlanet : planet;
        });
  
        setUserCount(mergedData);

        
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