import React from 'react'
import { AiTwotoneDollarCircle } from 'react-icons/ai'
import { TbCoinBitcoin } from 'react-icons/tb'

const CurrentBalanceComp = () => {
    return (
        <div className='flex gapx-5'>
            <div className='flex items-center  gap-x-1'>
                <span className='inline-block text-2xl '><AiTwotoneDollarCircle /></span>
                <span>5.456 </span>
                <span className='text-yellow-400'>USDT</span>
            </div>
            <div className='flex items-center gap-x-1'>
                <span className='inline-block text-2xl '><TbCoinBitcoin /></span>
                <span>10 BNB </span>
                <span className='text-yellow-400'>(BEP20)</span>
            </div>
            <div className='flex items-center gap-x-1'>
                <span className='inline-block text-2xl '><TbCoinBitcoin /></span>
                <span>10 BNB </span>
                <span className='text-yellow-400'>ET </span>
            </div>
        </div>
    )
}

export default CurrentBalanceComp