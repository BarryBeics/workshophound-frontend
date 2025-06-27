import { useEffect, useState } from "react";
import useGraphQLClient from "./useGraphQLClient";
import { READ_HISTORIC_PRICE_QUERY } from "../graph/prices/queries";

export const useHistoricPrice = (symbol, limit) => {
  const client = useGraphQLClient();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol || !limit) return;

    const fetch = async () => {
      try {
        const res = await client.request(READ_HISTORIC_PRICE_QUERY, { symbol, limit });
        setData(res.readHistoricPrice);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [client, symbol, limit]);

  return { data, isLoading, error };
};
