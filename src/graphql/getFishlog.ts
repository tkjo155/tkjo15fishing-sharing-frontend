import { gql } from '@apollo/client';

export const GET_FISHLOG = gql`
  query {
    getFishLog{
      id
      placeName
      date
      image
      fishName
      weather
      size
      isSpringTide
      isMiddleTide
      isNeapTide
      isNagashio
      isWakashio
    }
  }
`;
