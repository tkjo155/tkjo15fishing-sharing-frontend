import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { FISHLOGS } from '@/graphql/getFishlogs'
import React from 'react'
import { createApolloClient } from '@/libs/client'
import {   FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'


interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ( { data }: FishLogsListProps) => {
  const router = useRouter()
  const placeId = Number(router.query.placeId)
  const fishLogs = data?.fishLogs || [];
 

  // 取得した placeId と同じ placeId を持つ fishLog のみを取り出す
  const filteredFishLogs = fishLogs.filter(fishLog => fishLog.placeId === placeId);

  return (
    <div>
      <header className='text-gray-600'>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p className='font-bold text-white'style={{ fontSize: '30px' }}>
              Fishing Spots
            </p>
          </NavbarBrand>
        </Navbar>
      </header>
      {filteredFishLogs.map((fishLog) => (
      <h1 key={fishLog.id} style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>
       {fishLog.placeName}釣行記録
      </h1>))}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {filteredFishLogs.map((fishLog) => (
            <Card  key={fishLog.id}  style={{ width: '800px', padding: '15px' }}>
<Link href={`/fishlogslist/${fishLog.id}`}>              <CardHeader style={{ fontSize: '20px' }}>{fishLog.fishName}</CardHeader>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{fishLog.date}</div>
            </Link>
          </Card>
         ))}
      </div>
    </div>
  )}

  export const getStaticProps = async ({ params }: any) => {
    const apolloClient = createApolloClient();
    const placeId = params?.place.id; 
    const { data, error } = await apolloClient.query<FishLogsListProps>({
      query: FISHLOGS,
      variables: { placeId },
    });
    console.error('Error fetching data:', error);
    return {
      props: {
        data,
      },
      revalidate: 30,
    };
  };
  


export default FishlogsList
