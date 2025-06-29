import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../config";
import { READ_TRADE_OUTCOME_REPORTS } from "../graph/reports/queries";

const client = new GraphQLClient(graphqlEndpoint);

const useTradeReports = () => {
  const [outcomeReports, setOutcomeReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { readAllTradeOutcomes } = await client.request(READ_TRADE_OUTCOME_REPORTS);
        setOutcomeReports(readAllTradeOutcomes || []);
      } catch (err) {
        console.error("Failed to fetch trade outcome reports:", err);
        setOutcomeReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { outcomeReports, loading };
};

export default useTradeReports;
