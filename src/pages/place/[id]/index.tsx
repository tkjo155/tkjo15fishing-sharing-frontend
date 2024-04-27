import { Card, Navbar, NavbarBrand, CardHeader, Button } from '@nextui-org/react'
import Link from 'next/link'
import { GET_FISHLOGS } from '@/graphql/getFishlogs'
import { SimpleFishLog, FishLogsResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { format } from 'date-fns';


interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data }: FishLogsListProps) => {
  const router = useRouter();
  const { id } = router.query;

  if (!data) return <>データなし</>

  return (
    <div className='container mx-auto'>
      <header className='bg-gray-900 py-4 mb-8 rounded-t-lg'>
        <Navbar style={{ backgroundColor: 'transparent' }}>
          <NavbarBrand>
            <h1 className='text-white text-4xl font-bold px-6'>Fishing Spots</h1>
          </NavbarBrand>
          <Link
            href={`/place/${id}/new`}
            passHref
          >
            <Button color='primary' size='lg' variant='shadow' style={{ color: '#fff', fontFamily: 'Arial, sans-serif' }}>
              釣行記録登録
            </Button>
          </Link>
        </Navbar>
      </header>
      {data.getFishLogs.length > 0 ? (
        <>
          <h1 className='text-center text-3xl mt-4 mb-8 font-semibold text-gray-800'>
            {data.getFishLogs[0].placeName} 釣行記録
          </h1>
          <div className='grid grid-rows-3 gap-1 md:grid-cols-2 lg:grid-cols-3'>
            {data.getFishLogs.map((fishLog: SimpleFishLog) => (
              <Card key={fishLog.id} className='w-96 p-3 m-3 justify-self-center'>
                <Link
                  href={`/place/${fishLog.placeId}/log/${fishLog.id}`}
                  key={fishLog.id}
                  passHref
                >
                  <CardHeader className='text-lg'>{fishLog.fishName}</CardHeader>
                  <div className='flex text-gray-600 justify-end'>{fishLog.date}</div>
                </Link>
              </Card>
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
  id: string;
}

// 事前生成するページのパス（URL のパラメータ部分）のリストを返す（プリビルドすべきページの一覧情報を Next.js に教えてあげる）
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: [{
      params: { id: '1' }
    }, {
      params: { id: '2' }
    }, {
      params: { id: '3' }
    }, {
      params: { id: '4' }
    }, {
      params: { id: '5' }
    }],
    fallback: 'blocking'
  }
}
//パラメータ情報をもとにページコンポーネントに渡す props データを生成
export const getStaticProps: GetStaticProps<FishLogsListProps> = async context => {
  const apolloClient = createApolloClient();

  const { id } = context.params as PathParams;

  const { data, error } = await apolloClient.query<FishLogsResponse>({
    query: GET_FISHLOGS,
    variables: { placeId: Number(id) },
  });


  if (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
    revalidate: 30, // オプション: ページの再生成を有効にする
  };
}

export default FishlogsList
