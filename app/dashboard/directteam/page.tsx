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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { Input } from "@/components/ui/input"
import HeadingWrapper from '@/components/WrapperComponent/HeadingWrapper'


const page = () => {
  return (
    <div className='w-full h-full  flex flex-col items-center gap-y-10'>

      <div className='w-full my-10'>
        <HeadingWrapper text='Direct Team' />
      </div>

      <div className='flex items-center justify-around w-full py-10'>
        <div>
          <p>Show Entries</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ten">10</SelectItem>
              <SelectItem value="twenty_five">25</SelectItem>
              <SelectItem value="fifty">50</SelectItem>
              <SelectItem value="hundred">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p>Search ID</p>
          <Input placeholder='Enter BN ID' />
        </div>

      </div>

      <div className='w-auto mx-5 rounded-md'>
        <Table className=''>

          <TableHeader >
            <TableRow className='text-yellow-400 '>
              <TableHead className="w-[100px] px-3">BN ID</TableHead>
              <TableHead className='text-center'>Date and Time</TableHead>
              <TableHead className='text-center'>Current Planet Pool</TableHead>
              <TableHead className="text-center">Direct Team</TableHead>
              <TableHead className="text-center ">Addresses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className='text-center'>2.500</TableCell>
              <TableCell className="text-center">Earth ( 5 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>


          </TableBody>
        </Table>

      </div>
      
     <div className='w-full flex items-center justify-evenly'>
        <div >
        <p>Show 1 to 10 of 5,076 Entries</p>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
  
        </div>
     </div>


    </div>
  )
}

export default page