/* eslint-disable react/display-name */
import Link from 'next/link';
import React, { memo } from 'react'

interface BtnWrapperType{
  text:string;
  height:string;
  width:string;
  icon?: React.ReactNode;
  path?:string;
}

const BtnWrapper = memo(({text,height,width,icon,path}:BtnWrapperType) => {
  return (
    <div className={`bg-yellow-500 flex items-center gap-3  md:${height} md:${width} px-4 text-[10px] xl:text-lg  w-20 md:w-fit py-1  font-semibold rounded-md cursor-pointer hover:bg-yellow-600 duration-300`}>
         {
          path ? <Link href={path}>{text}</Link>:<span>{text}</span>
         }
         {
          icon&& <span>{icon}</span>
         }
        
    </div>
  )
}

)

export default BtnWrapper