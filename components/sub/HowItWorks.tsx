"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { MovingBorderDemo } from "./MovingBtn";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold  dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
      A Deep Dive into  <span className="text-yellow-500">Believe Network Space Ecosystem  Operational Framework</span>  {"  "}
       <br/>
       <MovingBorderDemo/>
      </motion.h1>
    </HeroHighlight>
  );
}
