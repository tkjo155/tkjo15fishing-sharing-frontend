import { gql } from '@apollo/client'

export const CREATE_FISHLOG = gql`
  mutation createPlace($create: CreateFishLog) {
    createFishLog(create: $create) {
      id
      placeId
      date
      image
      fishName
      isSunny
      isRainy
      isCloudy
      size
      tide
    }
  }
`
