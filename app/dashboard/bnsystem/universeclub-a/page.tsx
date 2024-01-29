import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import ClubAComp from '@/components/clientcomponents/bnsystemClientComp/ClubAComp'
import React from 'react'
import { ClubAPackageList } from '../../../../utils/CLubAPackages';


const page = () => {
  return (
    <div>
     <div className='w-fit ml-10 my-4  '>
      <BtnWrapper text='Back' height='py-1' width='px-4' path='/dashboard/bnsystem'/>
      </div>

      <div>
        <HeadingWrapper text="Club A Global Matrix"/>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 place-items-center gap-x-4 gap-y-5 mx-4 mt-5'>
       {
        ClubAPackageList.map((item) =>(
         <div key={item.id}>
           <ClubAComp
           
           PlanetName={item.packageName}
           PlanetPrice={item.packagePrice} 
           Members={item.members}
           centerImg={item.centerImage}
           orangeImg={item.orangeImage}
           sil1Img={item.sil1Image}
           sil2Img={item.sil2Image}
            />
         </div>
        ))
       }
      </div>

    </div>
  )
}

export default page