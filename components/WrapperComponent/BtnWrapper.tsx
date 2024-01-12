/* eslint-disable react/display-name */
import React, { memo } from 'react'

interface BtnWrapperType{
  text:string;
  height:string;
  width:string;
  icon?: React.ReactNode;
}

const BtnWrapper = memo(({text,height,width,icon}:BtnWrapperType) => {
  return (
    <div className={`bg-yellow-500 flex items-center gap-3  ${height} ${width} font-semibold rounded-md cursor-pointer hover:bg-yellow-600 duration-300`}>
         {text}
         {
          icon&& <span>{icon}</span>
         }
    </div>
  )
}

)

export default BtnWrapper