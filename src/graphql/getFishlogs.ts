import { gql } from '@apollo/client';

export const GET_FISHLOGS = gql`
  query GetFishLogs($placeId: Int) {
    getFishLogs(placeId: $placeId) {
      id
      placeId
      placeName
      date
      fishName
    }
  }
`;
