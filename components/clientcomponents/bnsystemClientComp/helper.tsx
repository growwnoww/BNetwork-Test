'use client'
import { useCallback, useState, useRef, useEffect, RefObject } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }): [Dimensions | undefined, { x: number; y: number }, RefObject<HTMLDivElement>] => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);

  return [dimensions, translate, containerRef];
};
