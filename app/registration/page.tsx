'use client'
import React, { useState } from 'react';
import classNames from 'classnames';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Yes');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black z-50">
      <div className='w-full max-w-lg mx-auto bg-[#121212] rounded-lg shadow-lg p-8'>
        <h2 className='text-4xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center font-bold mb-6'>
          Registration For Believe Network
        </h2>
        <div className='mb-10'>
          <p className='text-gray-400 text-center'>Do you already have an Upline?</p>
          <div className='flex justify-around mt-4'>
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                className={classNames(
                  'text-lg font-semibold py-2 px-6 rounded-full transition-all duration-300',
                  {
                    'bg-yellow-500 hover:bg-yellow-700 text-white': selectedOption === option,
                    'bg-gray-700 text-gray-300': selectedOption !== option,
                  }
                )}
                onClick={() => handleOptionChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {selectedOption === 'Yes' ? (
          <form className='space-y-4'>
            <div className='flex flex-col'>
              <label htmlFor='bnId' className='text-gray-400 mb-2'>Enter BN Id or Address</label>
              <input
                id='bnId'
                type='text'
                className='bg-gray-800 text-white rounded-lg p-3 focus:ring-yellow-500 focus:border-yellow-500'
                placeholder='BN Id or Address'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300'
            >
              Accept
            </button>
          </form>
        ):
        (
          <button
         
          className='w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300'
        >
          Sign up
        </button>
        )
        }
      </div>
    </div>
  );
};

export default Page;
