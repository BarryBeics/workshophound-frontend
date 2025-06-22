// React
import { useEffect, useState } from "react";

// Third-party libraries
import { Box } from "@mui/material";

// Graph
import { readTickerStats } from "../../graph/tickerStats/tickerStats";

// Components
import Header from "../../components/Header";
import MarketStatsTable from "../../components/MarketStatsTable";
import ThemedDataGrid from "../../components/ThemedDataGrid";

const MarketStatsView = () => {
  const [tickerStatsData, setTickerStatsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await readTickerStats();
      setTickerStatsData(data);
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
    <Box m="20px">
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
