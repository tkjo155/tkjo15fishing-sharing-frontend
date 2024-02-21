import {
  Navbar,
  NavbarBrand,
  Button,
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableColumn,
  TableCell,
} from '@nextui-org/react'

import Link from 'next/link'
import React from 'react'

const dummyFishLogs = {
  id: 1,
  name: '北海道港',
  date: '2024-02-16',
  fishName: 'Dummy Fish 1',
  weather: 'Sunny',
  size: 10,
  isSpringTide: true,
  isMiddleTide: false,
  isNeapTide: false,
  isNagashio: false,
  isWakashio: false,
}

const FishlogDetail = () => {
  return (
    <div>
      <header className='text-gray-600'>
        <Navbar style={{ backgroundColor: '#3498db' }}>
          <NavbarBrand style={{ textAlign: 'center', width: '100%' }}>
            <p className='font-bold text-white' style={{ fontSize: '30px' }}>
              Fishing Spots
            </p>
          </NavbarBrand>
        </Navbar>
      </header>
      <h1 style={{ textAlign: 'center', width: '100%', fontSize: '20px', marginBottom: '30px' }}>
        {dummyFishLogs.name} 釣行詳細記録
      </h1>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '80px' }}>
          {dummyFishLogs.fishName}
        </h2>
      </div>
      <div>
        <Table hideHeader removeWrapper aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>項目</TableColumn>
            <TableColumn>情報</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key='1'>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>日にち</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{dummyFishLogs.date}</TableCell>
            </TableRow>
            <TableRow key='2'>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>天気</TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>{dummyFishLogs.weather}</TableCell>
            </TableRow>
            <TableRow key='3'>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                サイズ(cm)
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}> {dummyFishLogs.size}cm </TableCell>
            </TableRow>
            <TableRow key='4'>
              <TableCell style={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                潮汐情報
              </TableCell>
              <TableCell style={{ border: '1px solid #ccc' }}>
                {dummyFishLogs.isSpringTide && '大潮'}
                {dummyFishLogs.isMiddleTide && '中潮'}
                {dummyFishLogs.isNeapTide && '小潮'}
                {dummyFishLogs.isNagashio && '長潮'}
                {dummyFishLogs.isWakashio && '若潮'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <Link href={`/fishlogslist`} passHref legacyBehavior>
            <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
              戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FishlogDetail
