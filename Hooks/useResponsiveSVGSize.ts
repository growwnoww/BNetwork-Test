import { useState, useEffect } from 'react';

// This is your custom hook
const useResponsiveSVGSize = (defaultSize:any, mobileSize:any) => {
    const [currentSize, setCurrentSize] = useState(defaultSize);

    useEffect(() => {
        // Function to update the current size based on window width
        const updateSize = () => {
            const newSize = window.innerWidth < 768 ? mobileSize : defaultSize;
            setCurrentSize(newSize);
        };

        // Update size on the first render
        updateSize();

        // Set up event listener for window resize
        window.addEventListener('resize', updateSize);

        // Clean up event listener
        return () => window.removeEventListener('resize', updateSize);
    }, [defaultSize, mobileSize]); // Only rerun effect if defaultSize or mobileSize changes

    return currentSize;
};

export default useResponsiveSVGSize;
