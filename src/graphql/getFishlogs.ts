import { gql } from '@apollo/client';

export const FISHLOGS = gql`
  query GetFishLogs($placeId: Int){
    fishLogs(placeId: $placeId)  {
      id
      placeId
      placeName
      date
      fishName
    }
  }
`;
