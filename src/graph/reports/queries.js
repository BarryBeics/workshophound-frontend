// graph/reports/queries.js
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


export const READ_ATR_SYMBOLS_QUERY = gql`
  query ReadATRSymbols {
    readATRSymbols
  }
`;

export const READ_ATR_TIMESTAMPS_QUERY = gql`
  query ReadATRTimestamps($symbol: String!) {
    readATRTimestamps(symbol: $symbol)
  }
`;

export const READ_ATR_REPORT_BY_SYMBOL_AND_TIMESTAMP_QUERY = gql`
  query ReadATRReportBySymbolAndTimestamp($symbol: String!, $timestamp: Int!) {
    readATRReportBySymbolAndTimestamp(symbol: $symbol, timestamp: $timestamp) {
      _id
      Symbol
      Timestamp
      Price
      Atr
      UpperLimit
      LowerLimit
      BotInstanceName
    }
  }
`;
