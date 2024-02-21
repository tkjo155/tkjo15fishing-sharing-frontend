import { Card, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const dummyFishLogs = [
  {
    id: 1,
    placeId: 1,
    name: '北海道港',
    date: '2024-02-16',
    fishName: 'Dummy Fish 1',
  },
]

const FishlogsList = () => {
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
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>{placeName}釣行記録</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {dummyFishLogs.map((dummyFishLog) => (
          <Card key={dummyFishLog.id} style={{ width: '800px', padding: '15px' }}>
            <Link href={`/fishlogslist/detail`} passHref>
              <CardHeader style={{ fontSize: '20px' }}>{dummyFishLog.fishName}</CardHeader>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{dummyFishLog.date}</div>
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

export default FishlogsList
