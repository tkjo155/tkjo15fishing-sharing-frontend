import { Card, CardBody, Navbar, NavbarBrand, Button, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GET_PLACES } from '../../graphql/getPlaces'
import { Place, PlacesResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'
import { useRouter } from 'next/router'
import { TbFish } from 'react-icons/tb'
import { GiBoatFishing } from 'react-icons/gi'
import { GiPlayButton } from 'react-icons/gi'
import { AiOutlineEdit } from 'react-icons/ai'

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

  const handleEditClick = (place: Place) => {
    router.push({
      pathname: '/place/new',
      query: {
        id: place.id,
        name: place.name,
        prefecture: place.prefecture,
      },
    })
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <header className='bg-gray-900 py-4 mb-8 w-full'>
        <div className='container mx-auto'>
          <Navbar style={{ backgroundColor: 'transparent' }}>
            <NavbarBrand>
              <div className='flex items-center ml-1'>
                <TbFish className='text-white text-3xl mr-2' />
                <h1 className='text-white text-3xl font-bold ml-2'>Fishing Spots</h1>
              </div>
            </NavbarBrand>
            <NavbarItem>
              <Link href={'/place/new'} passHref>
                <Button
                  color='primary'
                  size='sm'
                  variant='shadow'
                  style={{ color: '#fff', fontFamily: 'Arial, sans-serif' }}
                >
                  <GiPlayButton />
                  釣り場を登録
                </Button>
              </Link>
            </NavbarItem>
          </Navbar>
        </div>
      </header>
      <div className='flex items-center justify-center'>
        <h1 className='text-center text-4xl font-bold mb-3'>Fishing spots</h1>
        <GiBoatFishing className='ml-2 mb-3' size={32} />
      </div>
      <h2 className='text-center text-xl mb-20'>釣り場一覧</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto'>
        {data &&
          data.getAllPlaces.map((place: Place) => (
            <div key={place.id}>
              <Card className='max-w-md py-4 rounded overflow-hidden hover:bg-gray-200 shadow-lg bg-white'>
                <CardBody onClick={() => handleCardClick(place)}>
                  <p className='text-tiny uppercase font-bold ml-1 mt-0'>Spot name</p>
                  <h2 className='font-bold text-xl mb-2 ml-3 text-gray-800'>{place.name}</h2>
                  <p className='absolute bottom-2 right-3 text-sm text-gray-600'>
                    {place.prefecture}
                  </p>
                  <div className='absolute top-0 lg:right-2'>
                    <Button
                      color='default'
                      variant='solid'
                      size='sm'
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      onClick={() => handleEditClick(place)}
                    >
                      <AiOutlineEdit />
                      編集
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
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
