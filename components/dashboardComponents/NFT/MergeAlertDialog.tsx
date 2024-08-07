import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import { IoCloseSharp } from 'react-icons/io5';

type AlertDialogProps = {
  title: string;
  message: string;
  onCancel: () => void;
  NFTName?:string;
  NFTNumber?:number;
};

const MergeAlertDialog: React.FC<AlertDialogProps> = ({ title, message, onCancel,NFTName,NFTNumber }) => {
  const [newNFT,setNewNFT] = useState('');
  
    const getNFTImage = () =>{
      if(NFTName === "Earth_NFT"){
        setNewNFT('Mars_NFT')
      }
      else if(NFTName === "Mars_NFT")
      {
        setNewNFT('Venus_NFT')

      }
      else if(NFTName === "Venus_NFT"){
        setNewNFT("Saturn_NFT")
      }
      else if(NFTName === "Saturn_NFT"){
        setNewNFT("Neptune_NFT")
      }
    }

    useEffect(()=>{
           
      getNFTImage()
    },[])


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50  backdrop-blur-[2px]"></div>
      <div className="bg-zinc-800 rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 z-10 flex flex-col items-center justify-center">
     <div className='flex items-end justify-end w-full '>
    <p className=' rounded-full hover:bg-neutral-600'> <IoCloseSharp  className='text-4xl' onClick={onCancel}/></p>

  
     </div>
   
        <div>
{
    newNFT?
    <video autoPlay loop muted height={320} width={320}>
    <source src={`/${newNFT}.mp4`} type="video/mp4" />
</video>
    :
    ''

}
        </div>
        <h2 className="text-xl font-semibol`d mb-4">{newNFT}</h2>
        <p className="mb-6">{`You have successfully minit the ${newNFT}  🎉🤟`}</p>
      
      </div>
      <Confetti className='z-100'/>
    </div>
  );
};

export default MergeAlertDialog;
