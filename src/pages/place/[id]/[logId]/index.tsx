import {
  Navbar,
  NavbarBrand,
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableColumn,
  TableCell,
} from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_FISHLOG } from '@/graphql/getFishlog'
import {  FishLog, FishLogResponse, } from '@/Types'


const FishlogDetail = () => {
    const router = useRouter();
    const {id}  = router.query;
    const { data,loading,error} = useQuery<FishLogResponse>(GET_FISHLOG, {
      variables: { getFishLogId: Number(id) },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <>なし</>

const fishLog: FishLog = data.getFishLog;


return (
    <div>
      <header>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p  style={{ fontSize: '30px',fontWeight:'font-bold',color:'white',}}>
              Fishing Spots
            </p>
          </NavbarBrand>
        </Navbar>
      </header>
        <h1 style={{ textAlign: 'center', width: '100%', fontSize: '20px', marginBottom: '30px' }}>
       {fishLog.placeName} 釣行詳細記録
      </h1>
      <div style={{ textAlign: 'center' }}>
      
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '80px' }}>
          {fishLog.fishName}
        </h2>
    
      </div>
      <div>
          <Table hideHeader removeWrapper aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>項目</TableColumn>
            <TableColumn>情報</TableColumn>
          </TableHeader>
          <TableBody >
            <TableRow key={`date-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>日にち</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{fishLog.date}</TableCell>
            </TableRow>
            <TableRow key={`weather-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>天気</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{fishLog.weather}</TableCell>
            </TableRow>
            <TableRow key={`size-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                サイズ(cm)
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}> {fishLog.size}cm </TableCell>
            </TableRow>
            <TableRow key={`tide-${fishLog.id}`}>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                潮汐情報
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>
                {fishLog.isSpringTide && '大潮'}
                {fishLog.isMiddleTide && '中潮'}
                {fishLog.isNeapTide && '小潮'}
                {fishLog.isNagashio && '長潮'}
                {fishLog.isWakashio && '若潮'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </div>
         
    </div>
)}




export default FishlogDetail
