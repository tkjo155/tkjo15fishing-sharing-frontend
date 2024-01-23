import React, { useEffect, useState } from 'react'
import { Places } from '@/Types'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { gql, useQuery } from '@apollo/client'
import { constants } from 'os'

const GET_PLACES = gql`
  query {
    places {
      id
      name
      prefectureId
    }
  }
`

const PlacesList = () => {
  //「Task」の配列という型で空の配列を初期値とする
  const { data: placesData, loading: placesLoading, error: placesError } = useQuery(GET_PLACES)

  if (placesLoading) return <>Loading...</>
  if (placesError) return <>{`Error! ${placesError.message}`}</>

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
      {placesData.places.map((place: { id: number; name: string; prefectureId: number }) => (
        <Card key={place.id}>
          <CardBody>
            <strong>{place.name}</strong>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default PlacesList
