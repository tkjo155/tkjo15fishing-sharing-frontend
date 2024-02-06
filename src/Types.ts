//釣行記録
export type FishLogs = {
  id: number
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

export type Place = {
  id: number
  name: string
  prefecture: string
}

export type InputPlace = {
  id: number
  name: string
  prefectureId: number
}

export type PlacesResponse = {
  places: Place[]
}

export type Prefecture = {
  id: number
  name: string
}

export type PrefecturesResponse = {
  prefectures: Prefecture[]
}
