import React from 'react'
import { Place, PlacesResponse } from '@/Types'
import { GET_PLACES } from '../../graphql/getPlaces'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { client } from '../_app'
import Link from 'next/link'

interface PlacesListProps {
  placesData: PlacesResponse
}

const PlacesList = ({ placesData }: PlacesListProps) => {
  const placesListData = placesData?.places || []

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
            <Link href={'/placeslist/new'} passHref legacyBehavior>
              <Button color='primary' variant='shadow'>
                釣り場登録
              </Button>
            </Link>
          </NavbarItem>
        </Navbar>
      </header>
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣り場一覧</h1>
      {placesListData.map((place) => (
        <Card key={place.id}>
          <CardBody>
            <strong>{place.name}</strong>
            <p>{place.prefecture}</p>
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
