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
import { Button } from '@/components/ui/button'


const page = () => {
  return (
    <div className='w-full h-full  flex flex-col items-center '>

      <div className='w-full my-10'>
        <HeadingWrapper text='Tier Team' />
      </div>
      
      <div className='flex items-center justify-around   w-full'>
      <div>
          <p>Levels</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="level_1">Level 1</SelectItem>
              <SelectItem value="level_2">Level 2</SelectItem>
              <SelectItem value="level_3">Level 3</SelectItem>
              <SelectItem value="level_4">Level 4</SelectItem>
              <SelectItem value="level_5">Level 5</SelectItem>
              <SelectItem value="level_6">Level 6</SelectItem>
              <SelectItem value="level_7">Level 7</SelectItem>
              <SelectItem value="level_8">Level 8</SelectItem>
              <SelectItem value="level_9">Level 9</SelectItem>
              <SelectItem value="level_10">Level 10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-x-3 '>
          <div>
          <p>Packages</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Earth">Earth 5$</SelectItem>
              <SelectItem value="Moon">Moon 10$</SelectItem>
              <SelectItem value="Mars">Mars 25$</SelectItem>
              <SelectItem value="Venus">Venus 50$</SelectItem>
              <SelectItem value="Mercury">Mercury 100$</SelectItem>
              <SelectItem value="Jupiter">Jupiter 250$</SelectItem>
              <SelectItem value="Saturn">Saturn 500$</SelectItem>
              <SelectItem value="Uranus">Uranus 1000$</SelectItem>
              <SelectItem value="Neptune">Neptune 2500$</SelectItem>
              <SelectItem value="Pluto">Pluto 5000$</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <Button variant={'custom_yellow'} className='mt-6'>Submit</Button>
        </div>

      </div>


      <div className='flex items-center justify-around w-full py-4 gap-x-10'>
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
              <TableHead className="w-[100px] px-3 text-center">Tier No</TableHead>
              <TableHead className='text-center'>Date and Time</TableHead>
              <TableHead className='text-center'>ID No</TableHead>
              <TableHead className='text-center'>Upline Id</TableHead>
              <TableHead className='text-center'>Current Planet Pool</TableHead>
              <TableHead className="text-center ">Addresses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell> Nov 29 2023 8:04PM</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="font-medium">BN091287</TableCell>
              <TableCell className="text-center">Earth ( 10 )</TableCell>
              <TableCell className="text-center">0x9ab0196e92556c409f.....00d737f</TableCell>
            </TableRow>
           

          </TableBody>
        </Table>

      </div>
      
     <div className='w-full flex items-center justify-evenly mt-5'>
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