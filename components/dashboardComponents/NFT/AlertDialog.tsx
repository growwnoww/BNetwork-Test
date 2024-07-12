import React from 'react';
import Confetti from 'react-confetti'
import { IoCloseSharp } from 'react-icons/io5';

type AlertDialogProps = {
  title: string;
  message: string;

  onCancel: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = ({ title, message, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50  backdrop-blur-[2px]"></div>
      <div className="bg-zinc-800 rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 z-10 flex flex-col items-center justify-center">
     <div className='flex items-end justify-end w-full '>
    <p className=' rounded-full hover:bg-neutral-600'> <IoCloseSharp  className='text-4xl' onClick={onCancel}/></p>

    
     </div>
   
        <div>
        <video autoPlay loop muted height={320} width={320}>
                 <source src={`/Earth_NFT.mp4`} type="video/mp4" />
            </video>
        </div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
      
      </div>
      <Confetti className='z-100'/>
    </div>
  );
};

export default AlertDialog;
