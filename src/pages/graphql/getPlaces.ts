import { gql } from '@apollo/client'

export const GET_PLACES = gql`
  query {
    places {
      id
      name
      prefectureId
    }
  }
`
