import GalaxySystem from '@/components/clientcomponents/bnsystemClientComp/GalaxySystem'
import GlobalSystem from '@/components/clientcomponents/bnsystemClientComp/GlobalSystem'
import NFTRoyalityDiv from '@/components/clientcomponents/bnsystemClientComp/NFTRoyalityDiv'
import Planetupgradediv from '@/components/clientcomponents/bnsystemClientComp/Planetupgradediv'
import UniverseDiv from '@/components/clientcomponents/bnsystemClientComp/UniverseDiv'
import React from 'react'

const page = () => {
  return (
    <div className='overflow-y-visible'>
      <div>
        <Planetupgradediv/>
        <NFTRoyalityDiv/>
        <UniverseDiv/>
        <GlobalSystem/>
        <GalaxySystem/>
      </div>
    </div>
  )
}

export default page