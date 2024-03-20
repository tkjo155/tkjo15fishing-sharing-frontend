import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { GET_FISHLOGS } from '@/graphql/getFishlogs'
import React from 'react'
import { createApolloClient } from '@/libs/client'
import {   FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'


interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ( { data }: FishLogsListProps) => {
  const router = useRouter();
  const { placeName, placeId} = router.query;
  console.log('placeId:', placeId); 
  console.log(data)

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
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>
      {placeName}釣行記録
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {data?.fishLogs?.map((fishLog) => (
            <Card  key={fishLog.id}  style={{ width: '800px', padding: '15px' }}>
            <Link href={`/fishlogslist/`}>             
             <CardHeader style={{ fontSize: '20px' }}>{fishLog.fishName}</CardHeader>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{fishLog.date}</div>
            </Link>
          </Card>
         ))}
      </div>
    </div>
  )}

  export const getStaticProps = async ({ params }: any) => {
    const apolloClient = createApolloClient();
    const placeId = params?.placeId;
    const { data, error } = await apolloClient.query<FishLogsListProps>({
      query: GET_FISHLOGS,
      variables: { placeId }
    });
    console.log('placeId:', placeId); 

    console.error('Error fetching data:', error);
    return {
      props: {
        data,
      },
      revalidate: 30,
    };
  };
  


export default FishlogsList
