// graph/tickerStats/queries.js
import { gql } from "graphql-request";

export const LATEST_TIMESTAMP_QUERY = gql`
  query ReadLatestHistoricTickerStatsTimestamp {
    readLatestHistoricTickerStatsTimestamp
  }
`;

export const READ_ALL_SYMBOLS_QUERY  = gql`
    query readAvailableSymbols {
      readAvailableSymbols
    }
`;

export const MARKET_STATS_QUERY = gql`
  query MarketStatsQuery($Timestamp: Int!) {
    readHistoricTickerStatsAtTimestamp(Timestamp: $Timestamp) {
      Timestamp
      Stats {
        Symbol
        PriceChange
        PriceChangePct
        QuoteVolume
        Volume
        TradeCount
        HighPrice
        LowPrice
        LastPrice
        LiquidityEstimate
      }
    }
  }
`;


export const READ_TICKER_STATS_BY_SYMBOL = gql`
  query readTickerStatsBySymbol($symbol: String!, $limit: Int!) {
    readTickerStatsBySymbol(symbol: $symbol, limit: $limit) {
      Symbol
      PriceChange
      PriceChangePct
      QuoteVolume
      Volume
      TradeCount
      HighPrice
      LowPrice
      LastPrice
      LiquidityEstimate
    }
  }
`;
