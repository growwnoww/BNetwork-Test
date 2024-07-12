'use client'
import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { LuArrowUpRightSquare } from 'react-icons/lu';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContractInfo = ({ title, date, address }:any) => {
  const firstPart = address.slice(0, 20);
  const secondPart = address.slice(20);


  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(
      () => {
        toast.success('Address copied to clipboard!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      () => {
        toast.error('Failed to copy address!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  }

  return (
    <div className='mx-5'>
      <div className="w-[21rem] lg:w-[46rem] flex items-center gap-x-3 ">
        <p className="text-start text-sm lg:text-xl text-yellow-500">{title}</p>
        <p className="text-[9px] lg:text-sm">{date}</p>
      </div>
      <div className="h-16 bg-zinc-900 w-[21rem] lg:w-[46rem] rounded-xl my-2 grid grid-cols-3 place-items-center">
        <div className="text-[13px] lg:text-lg p-2 ">Contract Address</div>
        <div className="text-xs lg:text-md lg:flex">
          <div>{firstPart}</div>
          <div>{secondPart}</div>
        </div>
        <div className="flex gap-x-2  p-2 ml-2">
          <MdContentCopy    onClick={handleCopy} className="text-2xl lg:text-3xl text-zinc-500 p-1 rounded-3xl hover:bg-gray-800" />
          <LuArrowUpRightSquare className="text-2xl lg:text-3xl text-zinc-500 p-1 rounded-3xl hover:bg-gray-800" />
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default ContractInfo;
