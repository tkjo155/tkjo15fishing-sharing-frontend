import React, { useState } from 'react'
import { Spot } from '@/Types'
import SpotItem from './SpotItem'
import { Navbar, NavbarBrand, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Button, ButtonGroup } from '@nextui-org/react'

type SpotListProps = {
  spots: Spot[]
  setSpots: React.Dispatch<React.SetStateAction<Spot[]>>
}

const SpotList = ({ spots, setSpots }: SpotListProps) => {
  const ExampleSpots: Spot[] = [
    {
      id: 1,
      name: '東京港',
      prefecture: 'Tokyo',
      placeId: 123,
      date: '2024-01-01',
      fishName: 'Fish 1',
      weather: 'Sunny',
      size: 5,
      tackle: 'Rod and Reel',
    },
    {
      id: 2,
      name: '大阪港',
      prefecture: 'Osaka',
      placeId: 456,
      date: '2024-01-02',
      fishName: 'Fish 2',
      weather: 'Rainy',
      size: 7,
      tackle: 'Lure',
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
            <Button color='primary'>釣り場登録</Button>
          </NavbarItem>
        </Navbar>
      </header>
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣り場一覧</h1>
      {ExampleSpots.map((spot) => (
        <SpotItem key={spot.id} spot={spot} />
      ))}
    </div>
  )
}

export default SpotList
