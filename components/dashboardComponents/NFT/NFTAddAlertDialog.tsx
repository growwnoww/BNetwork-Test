import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

type AlertDialogProps = {
  title: string;
  onCancel: () => void;
};

const NFTAddAlertDialog: React.FC<AlertDialogProps> = ({ title, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] "></div>
      <div className="bg-zinc-800 rounded-lg shadow-lg w-11/12 md:w-1/2 md:h-[30rem] p-6 z-10 flex flex-col items-center justify-center">
      <div className='flex items-end justify-end w-full  -translate-y-12'>
          <p className='rounded-full hover:bg-neutral-600'>
            <IoCloseSharp className='text-4xl' onClick={onCancel} />
          </p>
        </div>
     <div>
   
         <div>

            <div className='-translate-y-10'>
                <p className='text-3xl text-center'>Upgrade NFT by Merging them</p>
            </div>
         <div className='flex gap-x-5'>
            
           <div className='bg-neutral-500 p-5 rounded-lg'>
           <video autoPlay loop muted height={220} width={220} className=''>
              <source src={`/Earth_NFT.mp4`} type="video/mp4" />
            </video>
           </div>
  
           <div className='bg-neutral-500 p-5 rounded-lg'>
           <video autoPlay loop muted height={220} width={220} className=''>
              <source src={`/Earth_NFT.mp4`} type="video/mp4" />
            </video>
           </div>
  
           <div className='bg-neutral-500 p-5 rounded-lg'>
           <video autoPlay loop muted height={220} width={220} className=''>
              <source src={`/Earth_NFT.mp4`} type="video/mp4" />
            </video>
           </div>
  
  
          </div>
         </div>
     </div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6"></p>
      </div>
    </div>
  );
};

export default NFTAddAlertDialog;
