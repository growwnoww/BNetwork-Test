'use client'
import React, { useEffect, useRef, useState } from "react";
import "./Carousel.css"; // Import the custom CSS for animation


const NFTCarousel = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first real image
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionRef = useRef<string>('transform 0.5s ease'); // Transition property

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      transitionRef.current = 'transform 0.5s ease'; // Apply transition for normal slides
    }, 5000); // Change image every 5 seconds

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === images.length + 1) {
      // When transitioning from the last cloned image to the first real image
      setTimeout(() => {
        setCurrentIndex(1);
        transitionRef.current = 'none'; // Remove transition to avoid visual jump
      }, 500); // Wait for the transition to complete
    } else if (currentIndex === 0) {
      // When transitioning from the first cloned image to the last real image
      setTimeout(() => {
        setCurrentIndex(images.length);
        transitionRef.current = 'none'; // Remove transition to avoid visual jump
      }, 500); // Wait for the transition to complete
    }
  }, [currentIndex, images.length]);

  const handleTransitionEnd = () => {
    if (currentIndex === images.length + 1) {
      setCurrentIndex(1); // Move to the first real image
    } else if (currentIndex === 0) {
      setCurrentIndex(images.length); // Move to the last real image
    }
  };

  return (
    <div className="relative overflow-hidden ">
      <div
        className="flex "
        style={{
          transition: transitionRef.current,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Clone the last image and place it at the beginning */}
        <div className="min-w-full h-[30rem] flex-shrink-0 ">
          <video muted loop autoPlay className="w-full  h-full object-contain">
            <source src={images[images.length - 1]} type="video/mp4" />
          </video>
        </div>

        {images.map((image: string, index: React.Key | null | undefined) => (
          <div key={index} className="w-full  h-[30rem] flex-shrink-0 ">
            <video muted loop autoPlay className=" w-full h-full   object-contain">
              <source src={image} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* Clone the first image and place it at the end */}
        <div className="min-w-full h-[30rem] flex-shrink-0">
          <video muted loop autoPlay className="w-full h-full object-contain">
            <source src={images[0]} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default NFTCarousel;
