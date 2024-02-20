import { Navbar, NavbarBrand, Button } from '@nextui-org/react'
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
      <table
        style={{ margin: '0 auto', width: '80%', maxWidth: '800px', borderCollapse: 'collapse' }}
      >
        <tbody>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>日にち</th>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{dummyFishLogs.date}</td>
          </tr>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>天気</th>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{dummyFishLogs.weather}</td>
          </tr>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>
              サイズ(cm)
            </th>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{dummyFishLogs.size}</td>
          </tr>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>
              潮汐情報
            </th>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              {dummyFishLogs.isSpringTide && '大潮'}
              {dummyFishLogs.isMiddleTide && '中潮'}
              {dummyFishLogs.isNeapTide && '小潮'}
              {dummyFishLogs.isNagashio && '長潮'}
              {dummyFishLogs.isWakashio && '若潮'}
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <Link href={`/fishlogslist`} passHref legacyBehavior>
          <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
            戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default FishlogDetail
