'use client'
import AlertDialog from '@/components/dashboardComponents/NFT/AlertDialog'
import NFTAddAlertDialog from '@/components/dashboardComponents/NFT/NFTAddAlertDialog'
import { truncate } from 'fs/promises'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import Confetti from 'react-confetti'


const BuyAndMergeNFTs = ({ params }: { params: { createNFTs: string } }) => {
    const searchParams = useSearchParams()
    const currentNFT = Object.values(params)
    const [buy,setBuy] = useState<boolean>(false)
    const [selectNFT,setSelectNFT] = useState<boolean>(false)

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleBuyClick = () => {
      setIsDialogOpen(true);
      setBuy(true)
    };
  
  
    const handleCancel = () => {
      setIsDialogOpen(false);
      setBuy(false)
    };

    const addNFTHandler = () =>{
     setSelectNFT(true)
    }

    const handleAddNFTCancel = () =>{
      setSelectNFT(false)
    }
    
  return (
    <div>
        
        <div className=''>
            <Link href='/dashboard/bnsystem/royalty_nft'>
                <p className='text-xl font-medium py-3'>
                    Back to NFT List
                </p>
            </Link>
        </div>

        <div className='flex flex-col lg:flex-row gap-x-4 mx-4'>
      <div className='lg:flex-[29%] h-[42rem] bg-zinc-900  rounded-xl'>
        <div className='bg-neutral-800 h-24 border-b-2 border-yellow-500  rounded-tl-xl rounded-tr-xl flex items-center justify-start pl-4'>
            <p className='text-2xl '>Earth</p>
        </div>
        <div className='mt-24 flex items-center justify-center'>
            <video autoPlay loop muted height={320} width={320}>
                 <source src={`/${currentNFT}.mp4`} type="video/mp4" />
            </video>
        </div>

      </div>
      <div className='lg:flex-[39%] h-[20rem] bg-zinc-900 rounded-xl'>
        <div className='bg-neutral-800 h-24 rounded-tl-xl rounded-tr-xl flex items-center justify-start pl-4'>
            <p className='text-2xl'>NFT Upgrade</p>
        </div>
        <div className='w-full'>
          <p className='border-b-2 border-yellow-500 w-fit ml-4'>By Merge</p>

       <div className='flex items-center '>
       <div className='flex flex-row  gap-x-4 ml-4 mt-4'>
         <div className='h-32 w-24  border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center'>
         <video autoPlay loop muted height={80} width={80}>
                 <source src={`/${currentNFT}.mp4`} type="video/mp4" />
            </video>
         </div>
          <div className='h-32 w-24  border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center'>
            <div>
              <button
              onClick={addNFTHandler}
              className='text-sm bg-stone-700 px-1 py-2 rounded-lg hover:bg-stone-800'> 	&#43; Add NFT</button>
            </div>
          </div>
          <div className='h-32 w-24  border-2 border-dashed rounded-lg border-slate-700 hover:border-2  hover:border-yellow-400 flex items-center justify-center'>
            <div>
              <button
              onClick={addNFTHandler}
              className='text-sm bg-stone-700 px-1 py-2 rounded-lg hover:bg-stone-800'> 	&#43; Add NFT</button>
            </div>
          </div>
         </div>

         <div className=' flex flex-col items-center justify-center'>
          <p className='text-[12px] text-slate-600 text-center  p-2'>Merge upgrade increases by one level at once</p>
         <button onClick={handleBuyClick} className='bg-neutral-700 px-5 rounded-lg py-3'>Merge</button>
         </div>
       </div>
          
        </div>


      </div>
      <div className='lg:flex-[31%] h-[10rem] bg-zinc-900  rounded-xl'>
      <div className='bg-neutral-800 h-24 rounded-tl-xl rounded-tr-xl flex items-center justify-start pl-4'>
            <p className='text-2xl'>Your Bonuses</p>
        </div>
        <div></div>
      </div>
    </div>
    {isDialogOpen && (
        <AlertDialog
          title={`${currentNFT} NFTs`}
          message={`You have successfully minit the ${currentNFT} NFT 🎉🤟` }

          onCancel={handleCancel}
        />
      )}
    {
      selectNFT && <NFTAddAlertDialog title='Earth NFT' onCancel={handleAddNFTCancel}/>  
      
    }
    
    </div>
  )
}

export default BuyAndMergeNFTs