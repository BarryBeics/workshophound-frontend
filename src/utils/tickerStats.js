import { graphqlEndpoint } from "../config";
import { GraphQLClient } from "graphql-request";
import { READ_TICKER_STATS_BY_SYMBOL } from "../graph/tickerStats/queries";

const client = new GraphQLClient(graphqlEndpoint);

export const fetchTickerStats = async (clientInstance, symbol, limit) => {
  const activeClient = clientInstance || client;

  try {
    const { readTickerStatsBySymbol } = await activeClient.request(READ_TICKER_STATS_BY_SYMBOL, {
      symbol,
      limit,
    });

    return Array.isArray(readTickerStatsBySymbol) ? readTickerStatsBySymbol : [];
  } catch (error) {
    console.error("Error fetching ticker stats:", error);
    return [];
  }
};
