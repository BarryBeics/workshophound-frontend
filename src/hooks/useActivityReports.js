import { useEffect, useState } from "react";
import useGraphQLClient from "../hooks/useGraphQLClient";
import { READ_ACTIVITY_REPORTS_QUERY } from "../graph/reports/queries";

export const useActivityReports = () => {
  const client = useGraphQLClient(); // now safe, already memoized

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //console.log("[useActivityReports] Fetching activity reports...");
      try {
        const result = await client.request(READ_ACTIVITY_REPORTS_QUERY);
       //console.log("[useActivityReports] Result:", result);
        setData(result.readAllActivityReports || []);
      } catch (err) {
        console.error("[useActivityReports] Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [client]); // this is now stable

  return { data, isLoading, error };
};
