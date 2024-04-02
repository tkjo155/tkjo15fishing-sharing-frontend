import { gql } from '@apollo/client';

export const GET_FISHLOG = gql`
  query GetFishLog($getFishLogId: Int) {
    getFishLog(id: $getFishLogId){
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
