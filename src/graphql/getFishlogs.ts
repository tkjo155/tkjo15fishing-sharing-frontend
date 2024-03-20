import { gql } from '@apollo/client';

export const GET_FISHLOGS = gql`
  query  {
    getFishLogs {
      id
      placeId
      placeName
      date
      fishName
    }
  }
`;
