import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, Button } from '@nextui-org/react'
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
      query: { placeId: place.id},
    })
  }
  return (
    <div>
     <header className='bg-sky-500'>
        <Navbar>
          <NavbarBrand>
            <p className='text-4xl font-bold border-black text-white'>
              Fishing Spots
            </p>
          </NavbarBrand>
          <NavbarItem>
            <Link href={'/place/new'} passHref legacyBehavior>
              <Button color='primary' variant='shadow'>
                釣り場登録
              </Button>
            </Link>
          </NavbarItem>
        </Navbar>
      </header>
      <h1 className='text-center text-2xl mt-4 mb-4'>釣り場一覧</h1>
      {data &&
        data.getAllPlaces.map((place: Place) => (
          <Link
          href={`/place/${place.id}`}
          key={place.id}
        >
         <Card key={place.id} onClick={() => handleCardClick(place)}>
              <CardBody>
                <strong>{place.name}</strong>
                <p>{place.prefecture}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
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