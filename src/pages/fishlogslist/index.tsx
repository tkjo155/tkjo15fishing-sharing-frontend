import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  },
]

const FishlogsList = ({ data }: PlacesListProps) => {
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
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣行記録</h1>
      <h1 style={{ fontSize: '24px' }}>{placeName}</h1>
      {dummyFishLogs.map((dummyFishLog) => (
        <Card key={dummyFishLog.id}>
          <Link href={`/fishlogslist/detail?placeName=${placeName}`} passHref legacyBehavior>
            <CardBody>
              <p>{dummyFishLog.date}</p>
              <p>{dummyFishLog.image}</p>
              <p>{dummyFishLog.fishName}</p>
            </CardBody>
          </Link>
        </Card>
      ))}
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

export default FishlogsList
