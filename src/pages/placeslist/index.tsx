import React, { useEffect, useState } from 'react'
import { Place, PlacesResponse } from '@/Types'
import { GET_PLACES } from '../../graphql/getPlaces'
import { Card, CardBody, Navbar, NavbarBrand, NavbarItem } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { useQuery } from '@apollo/client'
import { client } from '../_app'
import Link from 'next/link'

const PlacesList = () => {
  //港の配列状態管理/山括弧は TypeScript に使用
  const [places, setPlaces] = useState<Place[]>()
  //港の配列情報取得/山括弧は TypeScript に使用
  const { data: placesData } = useQuery<PlacesResponse>(GET_PLACES)
  //港の配列情報取得/山括弧は TypeScript に使用
  const { data: placesListData } = useQuery<PlacesResponse>(GET_PLACES)

  //[data]が変更された時だけ関数が発火する
  useEffect(() => {
    //初期位置データを取得
    const fetchInitialPlaces = async () => {
      // データが place プロパティを持つオブジェクトであると仮定
      const resultPlaces: Place[] = placesData?.places || []
      // 取得した場所を状態に設定
      setPlaces(resultPlaces)
    }
    // コンポーネントがマウントされたとき、配列情報または placeData が変更されたときに fetchInitialPlaces 関数を呼び出す
    fetchInitialPlaces()
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
            <Link href={'/placeslist/new'} passHref legacyBehavior>
              <Button color='primary' variant='shadow'>
                釣り場登録
              </Button>
            </Link>
          </NavbarItem>
        </Navbar>
      </header>
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>釣り場一覧</h1>
      {placesListData?.places.map((place) => (
        <Card key={place.id}>
          <CardBody>
            <strong>{place.name}</strong>
            <p>{place.prefecture || 'Unknown'}</p>
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
