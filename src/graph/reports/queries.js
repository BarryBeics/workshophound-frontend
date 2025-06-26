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

export const READ_TRADE_OUTCOME_REPORTS = gql`
  query {
    readAllTradeOutcomes {
      Timestamp
      BotName
      Balance
      Symbol
      Outcome
      Volume
      ElapsedTime
      PercentageChange
       FearGreedIndex    
      MarketStatus  
    }
  }
`;