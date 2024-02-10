import { Card, CardBody, Navbar, NavbarBrand, NavbarItem, Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GET_PLACES } from '../../graphql/getPlaces'
import { PlacesResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'

interface PlacesListProps {
  data: PlacesResponse
}

const PlacesList = ({ data }: PlacesListProps) => {
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
      {data.places.map((place) => (
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
//GetServerSideProps型にすることで、関数がサーバーサイドでデータを取得するためにNext.jsで定義された予測される形式に従う
export const getServerSideProps = async () => {
  //Apollo クライアント インスタンスを作成
  const apolloClient = createApolloClient()

  try {
    //データのフェッチ
    const { data } = await apolloClient.query<PlacesListProps>({
      query: GET_PLACES,
    })
    //取得したデータを props として返す
    return {
      props: {
        data,
      },
    }
    //データの取得中にエラーが発生した場合、エラーをログに記録し、null データを props として返す
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        placesData: null,
      },
    }
  }
}

export default PlacesList
