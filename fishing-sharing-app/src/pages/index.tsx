import React, { useState } from 'react'
import SpotList from '../components/SpotList'
import { Spot } from '@/Types'

function App() {
  const [spots, setSpots] = useState<Spot[]>([])

  return (
    <div>
      <SpotList spots={spots} setSpots={setSpots} />
    </div>
  )
}

export default App
