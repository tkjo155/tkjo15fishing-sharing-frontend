import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

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
      {dummyFishLogs.map((dummyFishLog) => (
        <h1 key={dummyFishLog.id} style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>
          {dummyFishLog.name} 釣行記録
        </h1>
      ))}
      {dummyFishLogs.map((dummyFishLog) => (
        <Link href={`/fishlogslist/detail`} passHref>
          <Card key={dummyFishLog.id}>
            <CardHeader>
              <p className='text-tiny uppercase font-bold'>{dummyFishLog.date}</p>
            </CardHeader>
            <h4 className='font-bold text-large' style={{ padding: '10px' }}>
              {dummyFishLog.fishName}
            </h4>
          </Card>
        </Link>
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
