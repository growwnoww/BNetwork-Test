import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { LuArrowUpRightSquare } from 'react-icons/lu';

const ContractInfo = ({ title, date, address }:any) => {
  const firstPart = address.slice(0, 20);
  const secondPart = address.slice(20);

  return (
    <div>
      <div className="w-[23rem] lg:w-[46rem] flex items-center gap-x-3">
        <p className="text-start text-lg lg:text-xl">{title}</p>
        <p className="text-sm">{date}</p>
      </div>
      <div className="h-16 bg-zinc-900 w-[23rem] lg:w-[46rem] rounded-xl my-2 grid grid-cols-3 place-items-center">
        <div className="text-sm lg:text-lg p-2">Contract Address</div>
        <div className="text-xs lg:text-md lg:flex">
          <div>{firstPart}</div>
          <div>{secondPart}</div>
        </div>
        <div className="flex gap-x-2 mr-3 p-2">
          <MdContentCopy className="text-2xl lg:text-3xl text-zinc-500 p-1 rounded-3xl hover:bg-gray-800" />
          <LuArrowUpRightSquare className="text-2xl lg:text-3xl text-zinc-500 p-1 rounded-3xl hover:bg-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
