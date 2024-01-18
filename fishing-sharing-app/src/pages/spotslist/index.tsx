import React, { useState } from 'react'
import SpotList from '../spotlist'
import { Places } from '@/Types'

function App() {
  const [places, setPlaces] = useState<Places[]>([])

  return (
    <div>
      <SpotList places={places} setPlaces={setPlaces} />
    </div>
  )
}

export default App
