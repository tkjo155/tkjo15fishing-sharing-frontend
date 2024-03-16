import { gql } from '@apollo/client';

export const FISHLOGS = gql`
  query {
    fishLogs {
      id
      placeId
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
