// utils/tickerStats.js

import { GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../config";
import {
  READ_ALL_SYMBOLS_QUERY,
  READ_TICKER_STATS_BY_SYMBOL,
} from "../graph/tickerStats/queries";

const defaultClient = new GraphQLClient(graphqlEndpoint);

export const fetchAvailableSymbols = async (client = defaultClient) => {
  try {
    const { readAvailableSymbols } = await client.request(READ_ALL_SYMBOLS_QUERY);
    return readAvailableSymbols || [];
  } catch (error) {
    console.error("Error fetching symbols:", error);
    return [];
  }
};

export const fetchTickerStats = async (client = defaultClient, symbol, limit = 12) => {
  try {
    const { readTickerStatsBySymbol } = await client.request(
      READ_TICKER_STATS_BY_SYMBOL,
      { symbol, limit }
    );
    return Array.isArray(readTickerStatsBySymbol) ? readTickerStatsBySymbol : [];
  } catch (error) {
    console.error("Error fetching ticker stats:", error);
    return [];
  }
};
