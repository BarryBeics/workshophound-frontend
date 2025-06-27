import { READ_TICKER_STATS_BY_SYMBOL } from "../graph/tickerStats/queries";

export const fetchTickerStats = async (client, symbol, limit) => {
  const res = await client.request(READ_TICKER_STATS_BY_SYMBOL, { symbol, limit });
  return Array.isArray(res.readTickerStatsBySymbol) ? res.readTickerStatsBySymbol : [];
};
