import React from 'react'

interface PropsType{
    text:string;
}

const HeadingWrapper = ({text}:PropsType) => {
  return (
    <div className='bg-stone-800 mx-10 rounded-md py-3 text-center'>
        <p className='text-2xl font-semibold'>{text}</p>
    </div>
  )
}

export default HeadingWrapper