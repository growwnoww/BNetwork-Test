import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const page = () => {
  return (
    <div className='w-full h-full  flex flex-col items-center '>

    <div className='w-full my-10'>
      <HeadingWrapper text='Tier Team' />
    </div>
    
   

    

    <div className='w-auto mx-5 rounded-md'>
      <Table className=''>

        <TableHeader >
          <TableRow className='text-yellow-400 '>
            <TableHead className="w-[100px] px-3 text-center">BN Id</TableHead>
            <TableHead className='text-center'>Date and Time</TableHead>
           
            <TableHead className='text-center'>Current Planet Pool</TableHead>
            <TableHead className="text-center ">Addresses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BN091287</TableCell>
            <TableCell> Nov 29 2023 8:04PM</TableCell>
            <TableCell className="text-center">0.20(0.10)</TableCell>
            <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
          </TableRow>
          
         

        </TableBody>
      </Table>

    </div>
    
   


  </div>
  )
}

export default page