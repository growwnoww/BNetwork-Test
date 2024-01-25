import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div>

        <div>
            <HeadingWrapper text='Create New Believer'/>
        </div>

        <div>
             <div><button>Registartion</button></div>
             <div><button>Planet Buy</button></div>

             <form action="">
              <Input
              type='text'
              placeholder=''
              />
             </form>
        </div>
    </div>
  )
}

export default page