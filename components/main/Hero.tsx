import React from 'react'
import HeroContent from '../sub/HeroContent'
import { HeroHighlightDemo } from '../sub/HowItWorks'
import Statistics from '../sub/Statistics'
import { GridBackground } from '../sub/GridBackground'
import { HeroScrollDemo } from '../sub/NFTTab'
import { SpotlightPreview } from '../sub/SpotlightPreview'
import { BackgroundGradientDemo } from '../sub/BackgroundGradientDemo'
import NFTSliderMain from '../sub/NFTSliderMain'






const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" >
    
    <div>
    <HeroContent/>
    <Statistics/>
    </div>  
    <HeroHighlightDemo/>

    

   <div className='-translate-y-7'>
   <GridBackground/>
   </div>

   
   <div className='-translate-y-36'>
   <HeroScrollDemo/>
   </div>
    {/* <NFTSliderMain/> */}

    <div className='-translate-y-80 lg:-translate-y-96'>

    <SpotlightPreview/>
    </div>



    
    
    {/* <BackgroundGradientDemo/> */}
    </div>
  )
}

export default Hero