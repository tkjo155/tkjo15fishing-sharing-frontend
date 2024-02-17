import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, Button } from '@nextui-org/react'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import { PlacesResponse } from '@/Types'
import { GET_PLACES } from '@/graphql/getPlaces'
import { createApolloClient } from '@/libs/client'

interface PlacesListProps {
  data: PlacesResponse
}

const dummyFishLogs = [
  {
    id: 1,
    placeId: 1,
    date: '2024-02-16',
    image: 'image1.jpg',
    fishName: 'Dummy Fish 1',
    weather: 'Sunny',
    size: 10,
    isSpringTide: true,
    isMiddleTide: false,
    isNeapTide: false,
    isNagashio: true,
    isWakashio: false,
  },
]

const PlacesDetail = ({ data }: PlacesListProps) => {
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
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣行詳細記録</h1>
      {dummyFishLogs.map((dummyFishLog) => (
        <Card key={dummyFishLog.id}>
          <CardBody>
            <p>{dummyFishLog.date}</p>
            <p>{dummyFishLog.image}</p>
            <p>{dummyFishLog.fishName}</p>
            <p>{dummyFishLog.weather}</p>
            <p>{dummyFishLog.size}</p>
            <p>{dummyFishLog.isSpringTide}</p>
            <p>{dummyFishLog.isMiddleTide}</p>
            <p>{dummyFishLog.isNeapTide}</p>
            <p>{dummyFishLog.isNagashio}</p>
            <p>{dummyFishLog.isWakashio}</p>
          </CardBody>
        </Card>
      ))}
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Link href={'/fishlogslist'} passHref legacyBehavior>
          <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
            戻る
          </Button>
        </Link>
        <Button color='primary' variant='shadow' size='lg'>
          編集
        </Button>
      </div>
    </div>
  )
}

export default PlacesDetail
