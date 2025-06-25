import { gql } from "graphql-request";

export const READ_ACTIVITY_REPORTS_QUERY = gql`
  query {
    readAllActivityReports {
      Timestamp
      Qty
      AvgGain
      TopAGain
      TopBGain
      TopCGain
    }
  }
`;

