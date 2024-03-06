import BtnWrapper from '@/components/WrapperComponent/BtnWrapper';
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper';
import PlanetUpPackage from '@/components/clientcomponents/bnsystemClientComp/PlanetUpPackage';
import PlanetUpPackageList from '@/utils/PackageList';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import React from 'react'
import { RocketIcon } from "@radix-ui/react-icons"

const page = () => {
  return (
    <div>

      <div className='flex flex-row justify-between'>
      <div className=' flex ml-10 my-4  '>
      <div>
      <BtnWrapper text='Back' height='py-1' width='px-4' path='/dashboard/bnsystem'/>
      </div>
    

      </div>
      
    
      </div>
      <div>
        <HeadingWrapper text="Planet Upgrade System"/>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 3xl:grid-cols-4 gap-y-3 mt-4'>
       {
        PlanetUpPackageList.map((planet) => (
          <PlanetUpPackage 
            key={planet.id}
            planetId={planet.id}
            imgURL={planet.imgURL}
            packageName={planet.packageName}
            packagePrice={planet.packagePrice} treePath={''} chartPath={''}          
          />
        ))
       }
      </div>
    </div>
  )
}


export default page;