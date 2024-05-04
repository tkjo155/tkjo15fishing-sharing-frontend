import { gql } from '@apollo/client'

export const UPDATE_PLACE = gql`
  mutation updatePlace($edit: EditPlace) {
    updatePlace(edit: $edit) {
        id
        name
        prefecture
      }
    }
`
