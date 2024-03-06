import { gql } from '@apollo/client'

export const GET_PLACES = gql`
  query {
    getAllPlaces {
      id
      name
      prefecture
    }
  }
`
