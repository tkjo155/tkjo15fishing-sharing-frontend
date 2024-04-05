import { Card, Navbar, NavbarBrand, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { GET_FISHLOGS } from '@/graphql/getFishlogs'
import {  SimpleFishLog, FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'
import { createApolloClient } from '@/libs/client'
import { GetStaticPaths, GetStaticProps } from 'next'


interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data }: FishLogsListProps ) => {
  const router = useRouter();
 const handleCardClick = (fishLog: SimpleFishLog) => {
  router.push({
    pathname:`/log/[id]`,
    query: { id: fishLog.id},
  })
}
  return (
    <div>
      <header>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ fontSize: '30px',fontWeight:'font-bold',color:'white', }}>
              Fishing Spots
            </p>
          </NavbarBrand>
        </Navbar>
      </header>
      {data && data.getFishLogs && (
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '24px' }}>
         {data.getFishLogs[0].placeName}釣行記録   
     </h1>
     ) }
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {data && data.getFishLogs &&
          data.getFishLogs.map((fishLog:SimpleFishLog) => (
           <Card  key={fishLog.id}  style={{ width: '800px', padding: '15px' }} onClick={() => handleCardClick(fishLog)}>
            <Link 
            href={`/place/${fishLog.id}/log`}
            key={fishLog.id}
            passHref
             >
             <CardHeader style={{ fontSize: '20px' }}>{fishLog.fishName}</CardHeader>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{fishLog.date}</div>
              </Link>
          </Card>
         ))}
      </div>
    </div>
  )}


// アクセス時のパスから抽出したい情報を表す型
type PathParams = {
  id: string;
}

//// 事前生成するページのパス（URL のパラメータ部分）のリストを返す（プリビルドすべきページの一覧情報を Next.js に教えてあげる）
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
