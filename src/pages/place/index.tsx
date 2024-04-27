import { Card, CardBody, Navbar, NavbarBrand, Button, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GET_PLACES } from '../../graphql/getPlaces'
import { Place, PlacesResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'
import { useRouter } from 'next/router'
import { IoIosSend } from "react-icons/io"
import { TbFish } from "react-icons/tb"
import { GiBoatFishing } from "react-icons/gi"



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
    <div>
      <header className='bg-gray-900 py-4 mb-8 w-full'>
      <div className='container'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
            <h1 className='text-white text-3xl font-bold'>
              <TbFish />Fishing Spots</h1>
            </NavbarBrand>
            <NavbarItem>
              <Link href={'/place/new'} passHref>
                <Button color='primary' size='lg' variant='shadow' style={{ color: '#fff', fontFamily: 'Arial, sans-serif' }}>
                <IoIosSend />
                釣り場を登録
                </Button>
              </Link>
            </NavbarItem>
          </Navbar>
        </div>
      </header>
      <div className='flex items-center justify-center'>
          <h1 className='text-center text-4xl font-bold mb-3'>
            Fishing spots
          </h1>
          <GiBoatFishing className='ml-2' size={32}/>
        </div>          <h2 className='text-center text-xl mb-20'>釣り場一覧</h2>
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
