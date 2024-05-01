import { gql } from "@apollo/client";

export const DELETE_Fishlog = gql`
  mutation DeletePlace($delete: DeleteFishLog) {
    deleteFishLog(delete: $delete) {
        id
        placeId
        placeName
        date
        image
        fishName
        isSunny
        isRainy
        isCloudy
        size
        tide
      }
    }
`;