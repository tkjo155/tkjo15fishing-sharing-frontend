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
import { FishLog, FishLogResponse, } from '@/Types'


const FishlogDetail = () => {
  const router = useRouter();
  const { logId } = router.query;

  const { data, loading, error } = useQuery<FishLogResponse>(GET_FISHLOG, {
    variables: { getFishLogId: Number(logId) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <>なし</>

  const fishLog: FishLog = data.getFishLog;

  return (
    <div className='container mx-auto'>
      <header className='bg-gray-900 py-4 mb-8 rounded-t-lg'>
        <div className='container mx-auto flex justify-center'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
              <h1 className='text-white text-4xl font-bold px-6'>Fishing Spots</h1>
            </NavbarBrand>
          </Navbar>
        </div>
      </header>
      <h1 className='text-center text-2xl mt-4'>
        {fishLog.placeName} 釣行詳細記録
      </h1>
      <div className='mt-4 mb-4'>
        <h2 className='text-center text-3xl font-semibold '>
          {fishLog.fishName}
        </h2>
      </div>
      <div className='w-full mt-10 max-w-xl mx-auto'>
        <Table hideHeader removeWrapper aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>項目</TableColumn>
            <TableColumn>情報</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key={`date-${fishLog.id}`}>
              <TableCell className='border border-gray-300 font-semibold w-2/5'>日にち</TableCell>
              <TableCell className='border border-gray-300 w-3/5'>{fishLog.date}</TableCell>
            </TableRow>
            <TableRow key={`weather-${fishLog.id}`}>
              <TableCell className='border border-gray-300 font-semibold w-2/5'>天気</TableCell>
              <TableCell className='border border-gray-300 w-3/5'>
                {fishLog.isSunny && '晴れ'}
                {fishLog.isRainy && '雨'}
                {fishLog.isCloudy && '曇り'}
              </TableCell>
            </TableRow>
            <TableRow key={`size-${fishLog.id}`}>
              <TableCell className='border border-gray-300 font-semibold w-2/5'>サイズ(cm)</TableCell>
              <TableCell className='border border-gray-300 w-3/5'>{fishLog.size}cm</TableCell>
            </TableRow>
            <TableRow key={`tide-${fishLog.id}`}>
              <TableCell className='border border-gray-300 font-semibold w-2/5'>潮汐情報</TableCell>
              <TableCell className='border border-gray-300 w-3/5'>{fishLog.tide}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}




export default FishlogDetail
