import React, { useEffect, useState } from 'react'
import { Places, Prefectures } from '@/Types'
import { GET_PLACES } from '../../graphql/getPlaces'
import {
  Card,
  CardBody,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NextUIProvider,
  dataFocusVisibleClasses,
} from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { client } from '../_app'
import router from 'next/router'
import { GET_PREFECTURES } from '@/graphql/getPrefecture'

const PlacesList = () => {
  const [places, setPlaces] = useState<Places[]>([])
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])
  const { data } = useQuery(GET_PLACES)
  const { data: prefecturesData } = useQuery(GET_PREFECTURES)

  useEffect(() => {
    // データが取得できたらPlacesをセット
    if (data) {
      setPlaces(data.places)
    }
    // データが取得できたらPrefecturesをセット
    if (prefecturesData) {
      setPrefectures(prefecturesData.prefectures)
    }
  }, [data, prefecturesData])

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
            <Button
              color='primary'
              variant='shadow'
              onClick={() => router.push('/placeregistration')}
            >
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
            <p>
              {prefectures.find((prefecture) => prefecture.id == place.prefectureId)?.name ||
                'Unknown'}
            </p>
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
