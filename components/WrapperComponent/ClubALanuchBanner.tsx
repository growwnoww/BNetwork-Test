'use client';
import React, { useState, useEffect } from 'react';

const ClubALanuchBanner = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeRemaining() {
    const launchDate:any = new Date('2024-04-15T00:00:00');
    const currentTime:any = new Date();
    const difference = launchDate - currentTime;

    if (difference <= 0) {
      // Offer has already launched, set remaining time to zero
      return 0;
    }

    // Calculate remaining time in milliseconds
    return difference;
  }

  function formatTime(milliseconds:any) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <div className=" z-50 w-full h-7 bg-yellow-400 flex items-center justify-center">
      <p className='text-sm text-black font-bold'>Get ready! Universe Club-A is launching in: </p>
      <div className='text-sm text-black font-bold px-1'> {formatTime(timeRemaining)}</div>
    </div>
  );
};

export default ClubALanuchBanner;
