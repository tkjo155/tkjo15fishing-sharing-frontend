import { gql } from '@apollo/client'

export const GET_PREFECTURES = gql`
  query {
    prefectures {
      id
      name
    }
  }
`
