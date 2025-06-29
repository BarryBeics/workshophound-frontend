import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { graphqlEndpoint } from "../config";
import { READ_TRADE_OUTCOME_REPORTS } from "../graph/reports/queries";
import ThemedDataGrid from "./ThemedDataGrid"; // adjust path if needed

const client = new GraphQLClient(graphqlEndpoint);

const RecentTrades = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRecentTrades = async () => {
      try {
        const { readAllTradeOutcomes } = await client.request(READ_TRADE_OUTCOME_REPORTS);

        const recent = readAllTradeOutcomes
          .slice()
          .sort((a, b) => b.Timestamp - a.Timestamp)
          .slice(0, 5)
          .map((trade, idx) => ({
            id: idx, // avoid timestamp as ID in case of duplication
            Bot: trade.BotName,
            Result: trade.Outcome,
            PercentageChange: parseFloat(trade.PercentageChange || 0).toFixed(2),
            Balance: parseFloat(trade.Balance || 0).toFixed(2),
          }));

        setRows(recent);
      } catch (err) {
        console.error("Failed to fetch recent trades:", err);
      }
    };

    fetchRecentTrades();
  }, []);

  const columns = [
    { field: "Bot", headerName: "Bot", flex: 1.2 },
    { field: "Result", headerName: "Result", flex: 0.8 },
    {
      field: "PercentageChange",
      headerName: "% Change",
      flex: 0.8,
      type: "number",
    },
    {
      field: "Balance",
      headerName: "Balance ($)",
      flex: 1,
      type: "number",
    },
  ];

  return (
    <ThemedDataGrid
      rows={rows}
      columns={columns}
      height="500px"
      hideFooter
      disableRowSelectionOnClick
    />
  );
};

export default RecentTrades;
