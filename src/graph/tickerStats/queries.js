import { gql, GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../../config";

const client = new GraphQLClient(graphqlEndpoint);

// Query to fetch the latest timestamp
const LATEST_TIMESTAMP_QUERY = gql`
  query ReadLatestHistoricTickerStatsTimestamp {
    readLatestHistoricTickerStatsTimestamp
  }
`;

// Query to fetch stats by timestamp
const MARKET_STATS_QUERY = gql`
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

// Main function to read stats at latest timestamp
export const readTickerStats = async () => {
  try {
    const { readLatestHistoricTickerStatsTimestamp } = await client.request(LATEST_TIMESTAMP_QUERY);

    console.log("Latest timestamp:", readLatestHistoricTickerStatsTimestamp);

    const { readHistoricTickerStatsAtTimestamp } = await client.request(MARKET_STATS_QUERY, {
      Timestamp: readLatestHistoricTickerStatsTimestamp,
    });

    const allStats = readHistoricTickerStatsAtTimestamp.flatMap((entry) => entry.Stats);

    console.log("Stats array:", allStats);

    return allStats;
  } catch (error) {
    console.error("Failed to fetch ticker stats:", error.response?.errors || error.message);
    throw error;
  }
};

export const READ_TICKER_STATS_BY_SYMBOL = gql`
  query readTickerStatsBySymbol($symbol: String!, $limit: Int!) {
    readTickerStatsBySymbol(symbol: $symbol, limit: $limit) {
      Symbol
      TradeCount
      LiquidityEstimate
    }
  }
`;


export const READ_ALL_PROJECTS_QUERY = gql`
  query ReadProjectsFilter {
    readProjectsFilter(filter: { sop: false }) {
      id
      title
      description
      labels
      assignedTo
      dueDate
      status
      tasks {
        id
      }
    }
  }
`;

export const READ_PROJECT_QUERY = gql`
  query ReadSingleProjectById($id: ID!) {
    readSingleProjectById(id: $id) {
          id
    title
    sop
    description
    labels
    assignedTo
    dueDate
    status
    createdAt
    updatedAt
    tasks {
id
    title
    description
    status
    labels
    assignedTo
    dueDate
    deferDate
    department
    projectId
    duration
    createdAt
    updatedAt
      }
    }
  }
`;