import { gql } from '@apollo/client';

export const FISHLOGS = gql`
  query {
    fishLogs {
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
