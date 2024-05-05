import React from 'react'
import { Card, Navbar, NavbarBrand, CardHeader, Button } from '@nextui-org/react'
import Link from 'next/link'
import { GET_FISHLOGS } from '@/graphql/getFishlogs'
import { SimpleFishLog, FishLogsResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { TbFish } from 'react-icons/tb'
import { PiFishSimpleDuotone } from 'react-icons/pi'
import { GiPlayButton } from 'react-icons/gi'

interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data }: FishLogsListProps) => {
  const router = useRouter()
  const { id } = router.query

  if (!data) return <>データなし</>

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
            <Link href={`/place/${id}/new`} passHref>
              <Button
                color='primary'
                size='sm'
                variant='shadow'
                style={{ color: '#fff', fontFamily: 'Arial, sans-serif' }}
              >
                <GiPlayButton />
                釣行記録を登録
              </Button>
            </Link>
          </Navbar>
        </div>
      </header>
      {data.getFishLogs.length > 0 ? (
        <>
          <div className='flex items-center justify-center'>
            <h1 className='text-center text-4xl font-bold mb-3'>Fishing records</h1>
            <PiFishSimpleDuotone className='ml-2 mb-3' size={32} />
          </div>
          <h2 className='text-center text-xl mb-20'>
            {data.getFishLogs[0].placeName} 釣行記録一覧
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto justify-center'>
            {data.getFishLogs.map((fishLog: SimpleFishLog) => (
              <Link href={`/place/${fishLog.placeId}/log/${fishLog.id}`} key={fishLog.id} passHref>
                <Card key={fishLog.id} className='py-4 w-64 mx-4 hover:bg-gray-200 my-4 h-60'>
                  <p className='text-tiny uppercase font-bold ml-3'>Fish name</p>
                  <CardHeader className='pb-0 pt-2 px-4 text-2xl font-semibold'>
                    {fishLog.fishName}
                  </CardHeader>
                  <div className='absolute bottom-2 right-2 text-gray-600'>{fishLog.date}</div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>釣行記録がありません</>
      )}
    </div>
  )
}

// アクセス時のパスから抽出したい情報を表す型
type PathParams = {
  id: string
}

// 事前生成するページのパス（URL のパラメータ部分）のリストを返す（プリビルドすべきページの一覧情報を Next.js に教えてあげる）
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: [
      {
        params: { id: '1' },
      },
      {
        params: { id: '2' },
      },
      {
        params: { id: '3' },
      },
      {
        params: { id: '4' },
      },
      {
        params: { id: '5' },
      },
    ],
    fallback: 'blocking',
  }
}
//パラメータ情報をもとにページコンポーネントに渡す props データを生成
export const getStaticProps: GetStaticProps<FishLogsListProps> = async (context) => {
  const apolloClient = createApolloClient()

  const { id } = context.params as PathParams

  const { data, error } = await apolloClient.query<FishLogsResponse>({
    query: GET_FISHLOGS,
    variables: { placeId: Number(id) },
  })

  if (error) {
    console.error('Error fetching data:', error)
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 30, // オプション: ページの再生成を有効にする
  }
}

export default FishlogsList
