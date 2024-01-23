import React from 'react'
import { AiTwotoneDollarCircle } from 'react-icons/ai'
import { MdOutlineOfflineBolt } from 'react-icons/md'
import { TbCoinBitcoin } from 'react-icons/tb'

const CurrentBalanceComp = () => {
    return (
        <div className='flex justify-between px-4 gapx-5 text-sm lg:text-lg'>
            <div className='flex items-center  lg:text-md gap-x-1'>
                <span className='inline-block text-2xl '><AiTwotoneDollarCircle className='text-sm text-yellow-500 lg:text-lg xl:text-lg'/></span>
                <span className=''>5.456 </span>
                <span className='text-yellow-400'>USDT</span>
            </div>
            <div className='flex items-center gap-x-1'>
                <span className='inline-block text-2xl '><TbCoinBitcoin className='text-sm text-yellow-500 lg:text-lg xl:text-lg'/></span>
                <span>10 BNB </span>
                <span className='text-yellow-400'>(BEP20)</span>
            </div>
            <div className='flex items-center gap-x-1'>
                <span className='inline-block text-2xl '><MdOutlineOfflineBolt className='text-sm text-yellow-500 lg:text-lg xl:text-lg'/></span>
                <span>10 ET </span>
                <span className='text-yellow-400'>ET </span>
            </div>
        </div>
    )
}

export default CurrentBalanceComp