import React, { useEffect, useState } from 'react'
import { Places } from '@/Types'
import { GET_PLACES } from '../graphql/getPlaces'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { client } from '../_app'

const PlacesList = () => {
  // コンポーネント内で管理する状態
  const [places, setPlaces] = useState<Places[]>([])
  const { data: placesData } = useQuery(GET_PLACES)
  //  placesData が変更されるたびにsetPlaces を呼び出す
  useEffect(() => {
    placesData && setPlaces(placesData.places)
  }, [placesData])

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
      {places.map((place) => (
        <Card key={place.id}>
          <CardBody>
            <strong>{place.name}</strong>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PLACES,
  })

  return {
    props: {
      placesData: data,
    },
    revalidate: 60,
  }
}

export default PlacesList
