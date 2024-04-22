import { Card, CardBody, Navbar, NavbarBrand, Button, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GET_PLACES } from '../../graphql/getPlaces'
import { Place, PlacesResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'
import { useRouter } from 'next/router'

interface PlacesListProps {
  data: PlacesResponse
}

const PlacesList = ({ data }: PlacesListProps) => {
  const router = useRouter()

  const handleCardClick = (place: Place) => {
    router.push({
      pathname: `/place/${place.id}`,
      query: { placeId: place.id },
    })
  }

  return (
    <div className='container mx-auto'>
      <header className='bg-gray-900 py-4 mb-8 rounded-t-lg'>
        <div className='container mx-auto'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
              <h1 className='text-white text-4xl font-bold px-6'>Fishing Spots</h1>
            </NavbarBrand>
            <NavbarItem>
              <Link href={'/place/new'} passHref>
                <Button color='primary' size='lg' variant='shadow' style={{ color: '#fff', fontFamily: 'Arial, sans-serif' }}>
                  釣り場登録
                </Button>
              </Link>
            </NavbarItem>
          </Navbar>
        </div>
      </header>
      <h1 className='text-center text-3xl mt-4 mb-8 font-semibold text-gray-800'>釣り場一覧</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data &&
          data.getAllPlaces.map((place: Place) => (
            <Link
              href={`/place/${place.id}`}
              key={place.id}>
              <Card
                className='w-full cursor-pointer'
                onClick={() => handleCardClick(place)}
              >
                <CardBody>
                  <h2 className='text-xl font-semibold mb-2 text-gray-800'>{place.name}</h2>
                  <p className='text-sm text-gray-600 text-right'>{place.prefecture}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const apolloClient = createApolloClient();
  const { data, error } = await apolloClient.query<PlacesListProps>({
    query: GET_PLACES,
  });

  console.log(error)

  return {
    props: {
      data,
    },
    revalidate: 30,
  };
};

export default PlacesList
