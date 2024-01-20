import React, { useState } from 'react'
import { Places } from '@/Types'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

type PlacesListProps = {
  places: Places[]
  setPlaces: React.Dispatch<React.SetStateAction<Places[]>>
}

const PlacesList = ({ places, setPlaces }: PlacesListProps) => {
  const examplePlaces: Places[] = [
    {
      id: 1,
      name: '東京港',
      prefectureId: 123,
    },
    {
      id: 2,
      name: '大阪港',
      prefectureId: 456,
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
      {examplePlaces.map((examplePlace) => (
        <Card key={examplePlace.id}>
          <CardBody>
            <strong>{examplePlace.name}</strong> - {examplePlace.prefectureId}
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default PlacesList
