
export type FishLog = {
  id: number
  placeId: number 
  placeName: string
  date: string
  image: string
  fishName: string
  isSunny: boolean
  isRainy: Boolean
  isCloudy: Boolean
  size: number
  tide: string
}

export type SimpleFishLog = {
  id: number
  placeId: number 
  placeName: string
  date: string
  fishName: string
}

export type InputFishLog = {
  id: number
  placeId: number 
  placeName: string
  date: string
  image: string
  fishName: string
  isSunny: boolean
  isRainy: boolean
  isCloudy: boolean
  weather: string[]
  size: number
  tide: string
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
  getAllPlaces: Place[]
}

export type FishLogsResponse = {
  getFishLogs: SimpleFishLog[]
}

export type FishLogResponse = {
  getFishLog: FishLog
}

export type Prefecture = {
  id: number
  name: string
}

export type PrefecturesResponse = {
  prefectures: Prefecture[]
}
