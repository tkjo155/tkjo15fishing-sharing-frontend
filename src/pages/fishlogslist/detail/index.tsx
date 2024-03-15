import {
  Navbar,
  NavbarBrand,
  Button,
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableColumn,
  TableCell,
} from '@nextui-org/react'
import { FISHLOGS } from '@/graphql/getFishlogs'
import Link from 'next/link'
import React from 'react'
import { createApolloClient } from '@/libs/client'
import { FishLog, FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'

interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogDetail = ({data}: FishLogsListProps ) => {
  const router = useRouter()
  const { placeName,fishName} = router.query
 

  return (
    <div>
      <header className='text-gray-600'>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p className='font-bold text-white' style={{ fontSize: '30px' }}>
              Fishing Spots
            </p>
          </NavbarBrand>
        </Navbar>
      </header>
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '20px', marginBottom: '30px' }}>
      {placeName} 釣行詳細記録
      </h1>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '80px' }}>
          {fishName}
        </h2>
      </div>
      <div>
      {data && data.fishLogs && data.fishLogs
        .filter((fishLog: FishLog) => fishLog.placeName === placeName)
        .map((fishLog: FishLog) => (
        <Table key={fishLog.id} hideHeader removeWrapper aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>項目</TableColumn>
            <TableColumn>情報</TableColumn>
          </TableHeader>
          <TableBody >
            <TableRow key={`date-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>日にち</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{fishLog.date}</TableCell>
            </TableRow>
            <TableRow key={`weather-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>天気</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{fishLog.weather}</TableCell>
            </TableRow>
            <TableRow key={`size-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                サイズ(cm)
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}> {fishLog.size}cm </TableCell>
            </TableRow>
            <TableRow key={`tide-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                潮汐情報
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>
                {fishLog.isSpringTide && '大潮'}
                {fishLog.isMiddleTide && '中潮'}
                {fishLog.isNeapTide && '小潮'}
                {fishLog.isNagashio && '長潮'}
                {fishLog.isWakashio && '若潮'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
        {data && data.fishLogs && data.fishLogs
        .filter((fishLog: FishLog) => fishLog.placeName === placeName)
        .map((fishLog: FishLog) => (
        <div key={fishLog.id}  style={{ marginTop: '100px', textAlign: 'center' }}>
        <Link href={`/fishlogslist?placeName=${encodeURIComponent(fishLog.placeName)}`} passHref>            
            <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
              戻る
           </Button>
        </Link>
        </div>
    ))}
      </div>
    </div>
)}

export const getServerSideProps = async () => {
  try {
    const apolloClient = createApolloClient();
    const { data, error } = await apolloClient.query<FishLogsListProps>({
      query: FISHLOGS,
      
    });

    if (error) {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data');
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        data: { getFishLogs: [] },
      },
    };
  }
};

export default FishlogDetail
