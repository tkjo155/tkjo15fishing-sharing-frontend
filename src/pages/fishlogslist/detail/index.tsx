import { Navbar, NavbarBrand, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const dummyFishLogs = {
  id: 1,
  date: '2024-02-16',
  image: 'image1.jpg',
  fishName: 'Dummy Fish 1',
  weather: 'Sunny',
  size: 10,
  isSpringTide: true,
  isMiddleTide: false,
  isNeapTide: false,
  isNagashio: true,
  isWakashio: false,
}

const FishlogDetail = () => {
  const router = useRouter()
  const { placeName } = router.query

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
        {placeName} 釣行詳細記録
      </h1>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue', marginBottom: '80px' }}>
          {dummyFishLogs.fishName}
        </h2>
        <h2 style={{ width: '80%', maxWidth: '500px', margin: '20px auto', marginBottom: '80px' }}>
          {dummyFishLogs.image}
        </h2>
      </div>
      <table style={{ margin: '0 auto', width: '80%', maxWidth: '800px' }}>
        <tbody>
          <tr>
            <th>日にち</th>
            <td>{dummyFishLogs.date}</td>
          </tr>
          <tr>
            <th>天気</th>
            <td>{dummyFishLogs.weather}</td>
          </tr>
          <tr>
            <th>サイズ(cm)</th>
            <td>{dummyFishLogs.size}</td>
          </tr>
          <tr>
            <th>潮汐情報</th>
            <td>
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
        <Link href={`/fishlogslist?placeName=${placeName}`} passHref legacyBehavior>
          <Button color='default' variant='shadow' size='lg' style={{ marginRight: '50px' }}>
            戻る
          </Button>
        </Link>
        <Button color='primary' variant='shadow' size='lg'>
          編集
        </Button>
      </div>
    </div>
  )
}

export default FishlogDetail
