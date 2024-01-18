import BtnWrapper from '@/components/WrapperComponent/BtnWrapper'
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import ClubBComp from '@/components/clientcomponents/bnsystemClientComp/ClubBComp'
import ClubBStructure from '@/components/clientcomponents/bnsystemClientComp/ClubBStructure'
import { ClubAPackageList } from '@/utils/CLubAPackages'
import React from 'react'

const page = () => {
  return (
    <div>
         <div className='w-fit ml-10 my-4 '>
           <BtnWrapper text='Back' height='py-1' width='px-4' path='/dashboard/bnsystem'/>
          </div>

          <div>
           <HeadingWrapper text="Club B Matrix"/>
          </div>
         
          <div className='grid grid-cols-4 place-items-center gap-y-4 mt-4 mx-3'>
          {
            ClubAPackageList.map((item) =>(
                <div key={item.id}>
                    <ClubBComp
                     PlanetName={item.packageName}
                     PlanetPrice={item.packagePrice}
                     Members={item.members}
                     centerImg={item.centerImage}
                     orangeImg={item.orangeImage}
                     sil1Img={item.sil1Image}
                     sil2Img={item.sil2Image}
                     redImg={item.redImage}
                     green1Img={item.green1Image}
                     green2Img={item.green2Image}
                     />
                </div>
            ))
          }
          </div>
         
    </div>
  )
}

export default page