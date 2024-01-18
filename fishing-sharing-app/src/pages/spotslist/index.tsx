import React, { useState } from 'react'
import SpotList from '../spotlist'
import { Places } from '@/Types'

function App() {
  const [spots, setSpots] = useState<Places[]>([])

  return (
    <div>
      <SpotList spots={spots} setSpots={setSpots} />
    </div>
  )
}

export default App
