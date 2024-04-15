import React from 'react'
import HeroContent from '../sub/HeroContent'
import { HeroHighlightDemo } from '../sub/HowItWorks'


const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" >
    
    <div>
    <HeroContent/>
    </div>  
    <HeroHighlightDemo/>

    </div>
  )
}

export default Hero