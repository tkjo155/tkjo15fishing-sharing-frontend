import {
  Navbar,
  NavbarBrand,
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableColumn,
  TableCell,
} from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import {  FishLog, FishLogResponse, } from '@/Types'


const FishlogDetail = () => {
    const router = useRouter();
    const {logId}  = router.query;
   
    const { data,loading,error} = useQuery<FishLogResponse>(GET_FISHLOG, {
      variables: { getFishLogId: Number(logId)},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <>なし</>

const fishLog: FishLog = data.getFishLog;

return (
    <div>
      <header className='bg-sky-500'>
        <Navbar>
          <NavbarBrand >
            <p className='text-4xl font-bold border-black text-white'>
              Fishing Spots
            </p>
          </NavbarBrand>
        </Navbar>
      </header>
        <h1 className='text-center text-2xl mt-4'>
       {fishLog.placeName} 釣行詳細記録
      </h1>
      <div className="mt-4 mb-4">
        <h2 className='text-center text-3xl font-semibold '>
          {fishLog.fishName}
        </h2>
      </div>
      <div>
          <Table hideHeader removeWrapper aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>項目</TableColumn>
            <TableColumn>情報</TableColumn>
          </TableHeader>
          <TableBody>
           <TableRow key={`date-${fishLog.id}`}>
            <TableCell className='border border-gray-300 font-semibold'>日にち</TableCell>
            <TableCell className='border border-gray-300'>{fishLog.date}</TableCell>
          </TableRow>
          <TableRow key={`weather-${fishLog.id}`}>
           <TableCell className='border border-gray-300 font-semibold'>天気</TableCell>
           <TableCell className='border border-gray-300'>{fishLog.weather}</TableCell>
          </TableRow>
          <TableRow key={`size-${fishLog.id}`}>
           <TableCell className='border border-gray-300 font-semibold'>サイズ(cm)</TableCell>
           <TableCell className='border border-gray-300'>{fishLog.size}cm</TableCell>
          </TableRow>
          <TableRow key={`tide-${fishLog.id}`}>
           <TableCell className='border border-gray-300 font-semibold'>潮汐情報</TableCell>
           <TableCell className='border border-gray-300'>
          {fishLog.isSpringTide && '大潮'}
          {fishLog.isMiddleTide && '中潮'}
          {fishLog.isNeapTide && '小潮'}
          {fishLog.isNagashio && '長潮'}
          {fishLog.isWakashio && '若潮'}
           </TableCell>
          </TableRow>
         </TableBody>
         </Table>
      </div>     
    </div>
)}




export default FishlogDetail
