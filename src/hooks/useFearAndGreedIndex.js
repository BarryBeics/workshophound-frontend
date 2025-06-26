import useGraphQLClient from "./useGraphQLClient";
import { READ_FEAR_AND_GREED_QUERY } from "../graph/fearAndGreed/queries";

export const useFearAndGreedIndex = () => {
  const client = useGraphQLClient();

  return useQuery({
    queryKey: ["fearAndGreedIndex"],
    queryFn: async () => {
      const res = await client.request(READ_FEAR_AND_GREED_QUERY);
      return res.readFearAndGreedIndex[0];
    },
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
};
