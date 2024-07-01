import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

const ClubALanuchBanner = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [isVisible, setIsVisible] = useState(true); // State variable to control visibility

  useEffect(() => {
    const id = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  function calculateTimeRemaining() {
    const launchDate:any = new Date('2024-06-03T21:30:00');
    const currentTime:any = new Date();
    const difference = launchDate - currentTime;

    if (difference <= 0) {
      // Offer has already launched, set remaining time to zero
      return 0;
    }

    // Calculate remaining time in milliseconds
    return difference;
  }

  

  function formatTime(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const handleClose = () => {
    console.log("Close button clicked");
    setIsVisible(false); // Hide the component
  };

  if (!isVisible) return null; // Don't render the component if isVisible is false

  return (
    <div className="absolute top-[12%] -right-[1%] z-30 w-full flex items-center justify-center">
      <div className='relative z-20'>
        <div className='z-50 cursor-pointer absolute top-1 right-1'>
          <IoMdClose className='cursor-pointer z-50 text-white text-4xl font-bold' onClick={handleClose}>close</IoMdClose>
        </div>
        <div className='relative z-10' >
             <video
                autoPlay
                muted
                height={900}
                width={900}
                className=''
                >
                <source src="/Royalty_NFT.mp4"  type="video/mp4" height={300} width={300}/>
                </video>
          <div className='absolute z-30 bottom-[29%] translate-x-[12%] md:translate-x-8'>
            {/* <div className='text-lg text-black font-bold px-1 lg:text-3xl'>{formatTime(timeRemaining)}</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubALanuchBanner;
 