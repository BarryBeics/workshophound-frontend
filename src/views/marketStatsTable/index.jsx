// React
import { useEffect, useState } from "react";

// Third-party libraries
import { Box } from "@mui/material";

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

    const allStats = await runWithConcurrencyLimit(symbols, 10, async (symbol) => {
      const stats = await fetchTickerStats(client, symbol, 1);
      console.log(`Stats for ${symbol}:`, stats);
      return stats?.[0]; // take latest entry
    });

    const cleaned = allStats.filter(Boolean);
    console.log("Cleaned ticker stats:", cleaned);

    setTickerStatsData(cleaned);
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
      <ThemedDataGrid
        rows={tickerStatsData}
        columns={columns}
        getRowId={(row) => row.Symbol}
      />
    </Box>
  );
};

export default MarketStatsView;
