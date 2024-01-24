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
import Link from 'next/link'


const page = () => {
  return (
    <div className='w-full h-full  flex flex-col items-center gap-y-'>

      <div className='w-full my-10'>
        <HeadingWrapper text='Club A Global Earnings' />
      </div>
         
   
      

       

      <div className='w-auto mx-5 rounded-md'>
        <Table className=''>

          <TableHeader >
            <TableRow className='text-yellow-400 '>
              <TableHead className="w-[100px] px-3">Sr.No</TableHead>
              <TableHead className='text-center'>Planet Name</TableHead>
              <TableHead className='text-center'>Amount</TableHead>
              <TableHead className='text-center'>Total Planet</TableHead>
              <TableHead className='text-center'>In Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Earth</TableCell>
              <TableCell className='text-center'>$10</TableCell>
              <TableCell className="text-center">10</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableCell>Moon</TableCell>
              <TableCell className='text-center'>$25</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">3</TableCell>
              <TableCell>Mars</TableCell>
              <TableCell className='text-center'>$50</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">4</TableCell>
              <TableCell>Mercury </TableCell>
              <TableCell className='text-center'>$100</TableCell>
              <TableCell className="text-center">8</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">5</TableCell>
              <TableCell>Venus </TableCell>
              <TableCell className='text-center'>$250</TableCell>
              <TableCell className="text-center">7</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">6</TableCell>
              <TableCell>Jupiter </TableCell>
              <TableCell className='text-center'>$500</TableCell>
              <TableCell className="text-center">8</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">7</TableCell>
              <TableCell>Saturn </TableCell>
              <TableCell className='text-center'>$1000</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">8</TableCell>
              <TableCell>Uranus </TableCell>
              <TableCell className='text-center'>$2500</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">9</TableCell>
              <TableCell>Neptune  </TableCell>
              <TableCell className='text-center'>$5000</TableCell>
              <TableCell className="text-center">6</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">10</TableCell>
              <TableCell>Pluto  </TableCell>
              <TableCell className='text-center'>$10000</TableCell>
              <TableCell className="text-center">3</TableCell>
              <TableCell className='text-center'><Link href='/dashboard/clubAglobalearn/clubAdetail'>View Detail</Link></TableCell>
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