"use client"
import useResponsiveSVGSize from "@/Hooks/useResponsiveSVGSize";
import React, { useEffect, useState } from "react";

interface EmptyNodeInTreeType {
  emptyHeight: number;
  emptyWidth: number;
  svgHeight?: string;
  svgWidth?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  styleSvg?: React.CSSProperties; // Add style for SVG
  defaultSize?:React.CSSProperties;
  mobileSize?:React.CSSProperties;

}

const EmptyNodeInTree = ({
  emptyHeight,
  emptyWidth,
  svgHeight,
  svgWidth,
  top,
  bottom,
  right,
  left,
  styleSvg,
  defaultSize,
  mobileSize
}: EmptyNodeInTreeType) => {

  const style = {
    position: 'absolute',
    top,
    bottom,
    right,
    left

  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // 768px is a common breakpoint for mobile devices
  const currentSize = useResponsiveSVGSize(defaultSize, mobileSize);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <> 
    {/* @ts-ignore */}
      <div style={style}>
        <p
          className="border-2 border-zinc-600   bg-black  w-fit rounded-full py-1   hover:border-yellow-400 duration-300 "
          data-tippy-directive=""
          tabIndex={0}
        >
          <svg
            width={emptyWidth}
            height={emptyHeight}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={currentSize}
          >
            <path
              d="M12 0L12 24M0 12L24 12"
              stroke="#666666"
              fill="#122143"
              strokeWidth="2"
            />
          </svg>
        </p>
      </div>
    </>
  );
};

export default EmptyNodeInTree;
