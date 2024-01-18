import React, { useState } from 'react'
import { Places } from '@/Types'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

type SpotListProps = {
  spots: Places[]
  setSpots: React.Dispatch<React.SetStateAction<Places[]>>
}

const SpotList = ({ spots, setSpots }: SpotListProps) => {
  const exampleFishLogs: Places[] = [
    {
      id: 1,
      name: '東京港',
      prefecture: 'Tokyo',
      placeId: 123,
    },
    {
      id: 2,
      name: '大阪港',
      prefecture: 'Osaka',
      placeId: 456,
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
      {exampleFishLogs.map((exampleFishLog) => (
        <Card key={exampleFishLog.id}>
          <CardBody>
            <strong>{exampleFishLog.name}</strong> - {exampleFishLog.prefecture}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default SpotList
