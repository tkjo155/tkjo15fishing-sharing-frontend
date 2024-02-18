import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { PlacesResponse } from '@/Types'

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
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>{placeName} 釣行記録</h1>
      {dummyFishLogs.map((dummyFishLog) => (
        <Card key={dummyFishLog.id}>
          <CardHeader>
            <Link href={`/fishlogslist/detail?placeName=${placeName}`} passHref>
              <p className='text-tiny uppercase font-bold'>{dummyFishLog.date}</p>
              <h4 className='font-bold text-large'>{dummyFishLog.fishName}</h4>
            </Link>
          </CardHeader>
          <Link href={`/fishlogslist/detail?placeName=${placeName}`} passHref>
            <CardBody className='overflow-visible py-2'>
              <p>{dummyFishLog.image}</p>
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
