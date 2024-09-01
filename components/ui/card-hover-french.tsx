'use client'
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    image: string;
    downloadbtn: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
  <div className="mt-20">
    <div className="text-start">
        <p className="text-xl lg:text-3xl font-medium">French Language</p>
    </div>
      <div
      className={cn(
        " grid grid-cols-2 lg:grid-cols-4 ",
                className
      )}
    >
      {items.map((item, idx) => (
        <div
          
          key={item?.image}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="w-[10rem] lg:w-full flex items-center justify-center">

            <div className="flex items-center justify-center">
            <Image
            src={item.image}
            alt={item.title}
            height={70}
            width={70}
            className=""
            />
            </div>

            <div className="text-center">
                <p>{item.title}</p>
            </div>

            <div className="text-center my-2">
          <Link className='bg-yellow-500 px-2 py-1 text-sm rounded-md font-semibold cursor-pointer' href={item.downloadbtn} target="_blank"  rel="noopener noreferrer">
              View PDF
            </Link>
          </div>
            
           
            {/* <CardTitle>{item.title}</CardTitle> */}
    
             
          </Card>


        </div>
      ))}
    </div>
  </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full  overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
       </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 text-xs font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
