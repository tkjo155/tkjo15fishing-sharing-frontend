import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { FISHLOGS } from '@/graphql/getFishlogs'
import React from 'react'
import { createApolloClient } from '@/libs/client'
import {  FishLog, FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'

interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data}: FishLogsListProps ) => {
  const router = useRouter()
  const { placeName } = router.query
  

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
      {data && data.fishLogs && data.fishLogs
        .filter((fishLog: FishLog) => fishLog.placeName === placeName)
        .map((fishLog: FishLog) => (
            <Card key={fishLog.id}  style={{ width: '800px', padding: '15px' }}>
          <Link href={`/fishlogslist/detail?placeId=${encodeURIComponent(fishLog.id)}&placeName=${encodeURIComponent(fishLog.placeName)}`}
          key={fishLog.id}
          passHref
        >          
           <CardHeader style={{ fontSize: '20px' }}>{fishLog.fishName}</CardHeader>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{fishLog.date}</div>
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

export const getStaticProps = async () => {
  //Apollo クライアント インスタンスを作成
  const apolloClient = createApolloClient()

  //データのフェッチ
  const { data, error } = await apolloClient.query<FishLogsListProps>({
    query: FISHLOGS,
  })
  console.error('Error fetching data:', error)

  //取得したデータを props として返す
  return {
    props: {
      data,
    },
    //30秒に一回更新できるようにする
    revalidate: 30,
  }
}


export default FishlogsList
