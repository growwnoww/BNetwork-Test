/* eslint-disable react/display-name */
import React, { memo } from 'react';

interface valueType {
  value: number;
}

const Progressbar = memo( ({ value }: valueType) => {
    const percentageValue = `${value}%`;
    console.log("re-render",value)
  
    return (
      <div className='relative h-2 mx-2 flex items-center bg-slate-500  rounded-md'>
        <span className={`absolute text-md bg-black rounded-full p-1  left-[${percentageValue}]`}>{value.toFixed()}%</span>
        <div className={`h-full w-[${percentageValue}] bg-green-500 rounded-md`}></div>
      </div>
    );
  });

export default Progressbar;


