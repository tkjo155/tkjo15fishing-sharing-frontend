import React, { useState } from 'react'
import { Spot } from '@/Types'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Button, ButtonGroup } from '@nextui-org/react'

type SpotListProps = {
  spots: Spot[]
  setSpots: React.Dispatch<React.SetStateAction<Spot[]>>
}

const SpotList = ({ spots, setSpots }: SpotListProps) => {
  const exampleSpots: Spot[] = [
    {
      id: 1,
      name: '東京港',
      prefecture: 'Tokyo',
      placeId: 123,
      date: '2024-01-01',
      fishName: 'Fish 1',
      image: 'fish1',
      weather: 'Sunny',
      size: 5,
      isSpringTide: true,
      isMiddleTide: false,
      isNagashio: false,
      isWakashio: false,
    },
    {
      id: 2,
      name: '大阪港',
      prefecture: 'Osaka',
      placeId: 456,
      date: '2024-01-02',
      fishName: 'Fish 2',
      image: 'fish2',
      weather: 'Rainy',
      size: 7,
      isSpringTide: false,
      isMiddleTide: true,
      isNagashio: false,
      isWakashio: false,
    },
  ]
  return (
    <div>
      <header className='text-gray-600 body-font'>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p className='font-bold text-white' style={{ fontSize: '30px' }}>
              Fishing Spots
            </p>
          </NavbarBrand>
          <NavbarItem>
            <Button color='primary' variant='shadow'>
              釣り場登録
            </Button>
          </NavbarItem>
        </Navbar>
      </header>
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣り場一覧</h1>

      {exampleSpots.map((exampleSpot) => (
        <Card key={exampleSpot.id}>
          <CardBody>
            <strong>{exampleSpot.name}</strong> - {exampleSpot.prefecture}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default SpotList
