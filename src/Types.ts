
export type FishLog = {
  id: number
  placeId: number 
  placeName: string
  date: string
  fishName: string
  weather: string
  size: number
  isSpringTide: boolean
  isMiddleTide: boolean
  isNeapTide: boolean
  isNagashio: boolean
  isWakashio: boolean
}

export type FishLogs = {
  id: number
  placeId: number 
  placeName: string
  date: string
  fishName: string
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
  getFishLogs: FishLogs[]
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
