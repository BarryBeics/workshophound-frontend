// graph/fearAndGreed/queries.js
import { gql } from "graphql-request";

export const READ_FEAR_AND_GREED_QUERY = gql`
  query {
    readFearAndGreedIndex(limit: 1) {
      Value
      ValueClassification
    }
  }
`;
