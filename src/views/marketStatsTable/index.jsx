// React
import { useEffect, useState } from "react";

// Third-party libraries
import {
  CircularProgress,
  Box,
} from "@mui/material";

// Graph
import { fetchAvailableSymbols, fetchTickerStats } from "../../utils/tickerStats";
import useGraphQLClient from "../../hooks/useGraphQLClient";
import { runWithConcurrencyLimit } from "../../utils/asyncConcurrencyLimits";

// Components
import Header from "../../components/Header";
import ThemedDataGrid from "../../components/ThemedDataGrid";

const MarketStatsView = () => {
  const [tickerStatsData, setTickerStatsData] = useState([]);
  const client = useGraphQLClient();

useEffect(() => {
  const getData = async () => {
    const symbols = await fetchAvailableSymbols(client);
    console.log("Available symbols:", symbols);

    let accumulatedStats = [];

    await runWithConcurrencyLimit(symbols, 10, async (symbol) => {
      const stats = await fetchTickerStats(client, symbol, 1);
      const stat = stats?.[0];
      if (stat) {
        accumulatedStats.push(stat);

        // Flush every 5 items
        if (accumulatedStats.length >= 5) {
          setTickerStatsData((prev) => [...prev, ...accumulatedStats]);
          accumulatedStats = [];
        }
      }
    });

    // Flush any remaining
    if (accumulatedStats.length > 0) {
      setTickerStatsData((prev) => [...prev, ...accumulatedStats]);
    }
  };

  getData();
}, []);



  const columns = [
    { field: "Symbol", headerName: "Symbol", flex: 1 },
    { field: "PriceChange", headerName: "Price Change", flex: 1 },
    { field: "PriceChangePct", headerName: "Price Change %", flex: 1 },
    { field: "QuoteVolume", headerName: "Quote Volume", flex: 1 },
    { field: "Volume", headerName: "Volume", flex: 1 },
    { field: "TradeCount", headerName: "Trade Count", flex: 1 },
    { field: "HighPrice", headerName: "High Price", flex: 1 },
    { field: "LowPrice", headerName: "Low Price", flex: 1 },
    { field: "LastPrice", headerName: "Last Price", flex: 1 },
    { field: "LiquidityEstimate", headerName: "Liquidity", flex: 1 },
  ];

  return (
    <Box>
      <Header title="MARKET SNAPSHOT" subtitle="Current symbol metrics at a glance" />
      {tickerStatsData.length === 0 ? (
  <Box display="flex" justifyContent="center" mt={4}>
    <CircularProgress />
  </Box>
) : (
  <ThemedDataGrid
    rows={tickerStatsData}
    columns={columns}
    getRowId={(row) => row.Symbol}
  />
)}
    </Box>
  );
};

export default MarketStatsView;
