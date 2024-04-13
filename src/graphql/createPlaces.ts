import { gql } from '@apollo/client'

export const CREATE_PLACE = gql`
  mutation createPlace($create: CreatePlace) {
    createPlace(create: $create) {
      id
      name
      prefectureId
    }
  }
`
