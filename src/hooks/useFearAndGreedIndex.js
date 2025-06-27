import { useState, useEffect } from "react";
import useGraphQLClient from "./useGraphQLClient";
import { READ_FEAR_AND_GREED_QUERY } from "../graph/fearAndGreed/queries";

export const useFearAndGreedIndex = () => {
  const client = useGraphQLClient();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client.request(READ_FEAR_AND_GREED_QUERY);
        setData(res.readFearAndGreedIndex[0]);
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
