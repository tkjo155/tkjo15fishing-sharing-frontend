import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { FISHLOGS } from '@/graphql/getFishlogs'
import React from 'react'
import { createApolloClient } from '@/libs/client'
import { FishLog, FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'

interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data}: FishLogsListProps ) => {
  const { query } = useRouter();
  const placeName = query.placeName as string;

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
      {placeName &&(
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>
      {placeName}釣行記録
      </h1>)}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {data && data.fishLogs &&
    data.fishLogs.map((getFishLog: FishLog) => (
                  <Card key={getFishLog.id} style={{ width: '800px', padding: '15px' }}>
            <Link href={`/fishlogslist/detail`} passHref>
              <CardHeader style={{ fontSize: '20px' }}>{getFishLog.fishName}</CardHeader>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{getFishLog.date}</div>
            </Link>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Link href={'/placeslist'} passHref legacyBehavior>
          <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
            戻る
          </Button>
        </Link>
      </div>
      
    </div>
  )
}

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

    // Return an empty dataset or handle the error as needed
    return {
      props: {
        data: { getFishLogs: [] },
      },
    };
  }
};



export default FishlogsList
