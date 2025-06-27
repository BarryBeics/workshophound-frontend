// utils/fetchHistoricPrice.js
import { READ_HISTORIC_PRICE_QUERY } from "../graph/prices/queries";

export const fetchHistoricPrice = async (client, symbol, limit) => {
  const res = await client.request(READ_HISTORIC_PRICE_QUERY, { symbol, limit });
  return res.readHistoricPrice;
};
