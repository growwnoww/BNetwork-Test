import { addNFT1 } from '@/store/atom';
import React from 'react';
import Confetti from 'react-confetti'
import { IoCloseSharp } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

type AlertDialogProps = {
  title: string;
  message: string;
  NFTName?:string;
  NFTNumber?:number;
  handleRemoveNFTCancel: ()=> void;
  onCancelPop:()=>void;
};



const RemoveNFTAlert: React.FC<AlertDialogProps> = ({ title, message,NFTName,NFTNumber ,handleRemoveNFTCancel,onCancelPop}) => {
    const [isSelected,setIsSelected] = useRecoilState(addNFT1)


   
    

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50  backdrop-blur-[2px]"></div>
      <div className="bg-zinc-800 rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 z-10 flex flex-col items-center justify-center">
      <div className="flex items-end justify-end w-full -translate-y-5 translate-x-5 lg:translate-x-0  lg:-translate-y-8">
          <p className="rounded-full hover:bg-neutral-600">
            <IoCloseSharp className="text-2xl lg:text-4xl" onClick={onCancelPop} />
          </p>
        </div>
   
        <div>
            <p>{NFTNumber}</p>
        <video autoPlay loop muted height={320} width={320}>
                 <source src={`/${NFTName}.mp4`} type="video/mp4" />
            </video>
        </div>
        <h2 className="text-xl font-semibol`d mb-4">{title}</h2>
         <button className='bg-red-500 px-2 py-1' onClick={handleRemoveNFTCancel}>Remove NFT</button>
      </div>
    </div>
  );
};

export default RemoveNFTAlert;
