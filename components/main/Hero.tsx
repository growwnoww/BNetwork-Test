import React from 'react'
import HeroContent from '../sub/HeroContent'
import { HeroHighlightDemo } from '../sub/HowItWorks'
import Statistics from '../sub/Statistics'
import { GridBackground } from '../sub/GridBackground'
import { HeroScrollDemo } from '../sub/NFTTab'
import { SpotlightPreview } from '../sub/SpotlightPreview'
import { BackgroundGradientDemo } from '../sub/BackgroundGradientDemo'





const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" >
    
    <div>
    <HeroContent/>
    <Statistics/>
    </div>  
    <HeroHighlightDemo/>

    <GridBackground/>

    <HeroScrollDemo/>

    <SpotlightPreview/>
    
    {/* <BackgroundGradientDemo/> */}
    </div>
  )
}

export default Hero