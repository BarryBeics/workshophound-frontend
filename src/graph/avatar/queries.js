// graph/avatar/queries.js
import { gql } from "graphql-request";

export const READ_AVATARS_QUERY = gql`
  query {
    readAllAvailableAvatars {
      filename
    }
  }
`;