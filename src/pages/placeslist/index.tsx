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
      pathname: '/fishlogslist',
      query: { placeId: place.id},
    })
  }
  return (
    <div>
      <header className='text-gray-600'>
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
      {data &&
        data.getAllPlaces.map((place: Place) => (
          <Link
          href={`/fishlogslist?placeId=${encodeURIComponent(place.id)}&placeName=${encodeURIComponent(place.name)}`}
          key={place.id}
          passHref
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
//getStaticProps型にすることで、関数がサーバーサイドでデータを取得するためにNext.jsで定義された予測される形式に従う
export const getStaticProps = async () => {
  //Apollo クライアント インスタンスを作成
  const apolloClient = createApolloClient()

  //データのフェッチ
  const { data, error } = await apolloClient.query<PlacesListProps>({
    query: GET_PLACES,
  })
  console.error('Error fetching data:', error)

  //取得したデータを props として返す
  return {
    props: {
      data,
    },
    //30秒に一回更新できるようにする
    revalidate: 30,
  }
}

export default PlacesList
