import { Card, Navbar, NavbarBrand, CardHeader, Button } from '@nextui-org/react'
import Link from 'next/link'
import { GET_FISHLOGS } from '@/graphql/getFishlogs'
import {  SimpleFishLog, FishLogsResponse } from '@/Types'
import { createApolloClient } from '@/libs/client'
import { GetStaticPaths, GetStaticProps } from 'next'

interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data}: FishLogsListProps ) => {

  if (!data) return <>データなし</>
 
  return (
    <div>
      <header className='bg-sky-500'>
        <Navbar>
        <NavbarBrand>
            <p className='text-4xl font-bold border-black text-white'>
              Fishing Spots
            </p>
          </NavbarBrand>
          <Link href="/place/[id]/new" 
          as={`/place/${data.getFishLogs[0].placeId}/new`} 
          passHref
          >
            <Button color='primary' variant='shadow'>
              釣行記録登録
            </Button>
            </Link>
            </Navbar>
      </header>
      {data.getFishLogs.length > 0 ?(
        <>
      <h1 className='text-center text-2xl mt-4 mb-4'>
         {data.getFishLogs[0].placeName}釣行記録   
     </h1>
      <div className='flex justify-center flex-wrap'>
      {data.getFishLogs.map((fishLog:SimpleFishLog) => (
           <Card  key={fishLog.id} className='w-96 p-4 m-4'>
            <Link 
            href={`/place/${fishLog.placeId}/log/${fishLog.id}`}
            key={fishLog.id}
            passHref
             >
             <CardHeader className='text-lg'>{fishLog.fishName}</CardHeader>
              <div className='flex justify-end'>{fishLog.date}</div>
              </Link>
          </Card>
         ))}
      </div>
      </>
      ) : (
        <>釣行記録がありません</>
      )}
    </div>
  )}


// アクセス時のパスから抽出したい情報を表す型
type PathParams = {
  id: string;
}

// 事前生成するページのパス（URL のパラメータ部分）のリストを返す（プリビルドすべきページの一覧情報を Next.js に教えてあげる）
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: [{
      params: { id: '1' }
    },{
      params: { id: '2' }
    },{
      params: { id: '3' }
    },{
      params: { id: '4' }
    },{
      params: { id: '5' }
    }],
    fallback: 'blocking'
  }
}
//パラメータ情報をもとにページコンポーネントに渡す props データを生成
export const getStaticProps: GetStaticProps<FishLogsListProps> = async  context =>  {
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
  };}

export default FishlogsList
