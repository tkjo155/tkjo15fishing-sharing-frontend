import { Card, CardBody, Navbar, NavbarBrand, Button, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { GET_FISHLOGS } from '@/graphql/getFishlogs'
import {   FishLog, FishLogs, FishLogsResponse } from '@/Types'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { createApolloClient } from '@/libs/client'
import { GetStaticPaths, GetStaticProps } from 'next'


interface FishLogsListProps {
  data: FishLogsResponse
}

const FishlogsList = ({ data }: FishLogsListProps ) => {
  const router = useRouter();
 const handleCardClick = (fishLog: FishLogs) => {
  router.push({
    pathname:`/log/${fishLog.id}`,
    query: { id: fishLog.id},
  })
}
  return (
    <div>
      <header className='text-gray-600'>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p className='font-bold text-white'style={{ fontSize: '30px' }}>
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
          data.getFishLogs.map((fishLog:FishLogs) => (
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

// ページコンポーネントに渡される props の型
type PageProps = {
  id: string;
  placeId: number;
  placeName: string;
  date: string;
  fishName: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<FishLogsResponse>({
    query: GET_FISHLOGS,
  });

 

  const paths = data.getFishLogs.map((fishLog: FishLogs) => ({
    params: { id: fishLog.placeId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async  context =>  {
  const apolloClient = createApolloClient();

  const { id } = context.params as PathParams;

  const { data, error } = await apolloClient.query<FishLogsResponse>({
    query: GET_FISHLOGS,
    variables: { placeId: Number(id) },
  });

  const fishLog = data.getFishLogs[0];

  if (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
      id,
      placeId: fishLog.placeId,
      placeName: fishLog.placeName,
      date: fishLog.date,
      fishName: fishLog.fishName,
    },
    revalidate: 30, // オプション: ページの再生成を有効にする
  };}


export default FishlogsList
