export type FishLogs = {
  id: number
  name: string
  prefecture: string
  placeId: number
  date: string
  image: string
  fishName: string
  weather: string
  size: number
  isSpringTide: boolean
  isMiddleTide: boolean
  isNeapTide: boolean
  isNagashio: boolean
  isWakashio: boolean
}

export type Places = {
  id: number
  name: string
  placeId: number
}
