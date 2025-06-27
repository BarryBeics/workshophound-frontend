import { useEffect, useState } from "react";
import useGraphQLClient from "./useGraphQLClient";
import { READ_ALL_STRATEGIES_QUERY } from "../graph/strategies/queries";

export const useStrategies = () => {
  const client = useGraphQLClient();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client.request(READ_ALL_STRATEGIES_QUERY);
        setData(res.readAllStrategies);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [client]);

  return { data, isLoading, error };
};
