// React & Hooks
import { useState, useMemo } from "react";

// Third-party
import { Box, Typography, Button } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material/styles";

// Theme
import { tokens } from "../../theme";

// Components
import SymbolDropdown from "../../components/SymbolDropdown";
import Header from "../../components/Header";
import TimeRangeSelector from "../../components/TimeRangeSelector";
import ViewModeToggle from "../../components/ViewModeToggle";

import useGraphQLClient from "../../hooks/useGraphQLClient";


const LiquidityTrendChart = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [timeFrameQty, setTimeFrameQty] = useState(12);
  const [rawSymbolStats, setRawSymbolStats] = useState({});
  const [viewMode, setViewMode] = useState("liquidity");
  const client = useGraphQLClient();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

const handleAddSymbol = async (_, newSymbol) => {
  if (!newSymbol || selectedSymbols.includes(newSymbol)) return;

  try {
    const rawStats = await (client, newSymbol, timeFrameQty, client);
    if (!Array.isArray(rawStats) || rawStats.length === 0) {
      console.warn("No valid data for:", newSymbol);
      return;
    }

    const reversed = rawStats.slice().reverse();

    setSelectedSymbols((prev) => [...new Set([...prev, newSymbol])]);
    setRawSymbolStats((prev) => ({
      ...prev,
      [newSymbol]: reversed,
    }));
  } catch (error) {
    console.error("Error fetching liquidity data:", error);
  }
};



  // Recompute chartData from rawSymbolStats on viewMode or selectedSymbols change
  const chartData = useMemo(() => {
  return selectedSymbols.map((symbol) => {
    const stats = rawSymbolStats[symbol];
    if (!stats) return null;

    const data = stats.map((s, i) => {
      const raw =
        viewMode === "liquidity"
          ? parseFloat(s.LiquidityEstimate ?? "NaN")
          : parseFloat(s.TradeCount ?? "NaN");

      if (!isFinite(raw)) return null;

      return {
        x: `T-${stats.length - i}`,
        y: raw,
      };
    }).filter(Boolean); // removes nulls

    return data.length > 0 ? { id: symbol, data } : null;
  }).filter(Boolean); // removes symbols with no valid points
}, [selectedSymbols, rawSymbolStats, viewMode]);


  return (
    <Box m="20px">
      <Header
        title="LIQUIDITY TREND"
        subtitle="Visualizing average liquidity over time for better trade execution confidence"
      />

      {/* Controls */}
      <Box display="flex" gap={4} flexWrap="wrap" mb={4}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Liquidity Trends</Typography>
          <SymbolDropdown
            selectedSymbols={selectedSymbols}
            setSelectedSymbols={setSelectedSymbols}
            onSelectSymbol={handleAddSymbol}
          />
        </Box>

        <Box
          backgroundColor={colors.grey[800]}
          borderRadius="5px"
          boxShadow={1}
          p={2}
          minHeight="100px"
          width={300}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TimeRangeSelector
            value={timeFrameQty}
            onChange={setTimeFrameQty}
            colorMode={colors}
          />

        </Box>
        <Box display="flex" alignItems="center">
          <ViewModeToggle
            value={viewMode}
            onChange={setViewMode}
            modes={[
              { id: "liquidity", label: "Liquidity View" },
              { id: "trades", label: "Trade Count View" },
            ]}
          />
        </Box>
      </Box>


      {/* Chart */}
      <Box height="500px">
        {chartData.length > 0 ? (
          <ResponsiveLine
            data={chartData}
            theme={{
              axis: {
                domain: { line: { stroke: colors.grey[100] } },
                legend: { text: { fill: colors.grey[100] } },
                ticks: {
                  line: { stroke: colors.grey[100], strokeWidth: 1 },
                  text: { fill: colors.grey[100] },
                },
              },
              legends: { text: { fill: colors.grey[100] } },
              tooltip: {
                container: {
                  color: colors.houndGold[500],
                  background: colors.houndGold[400],
                },
              },
            }}
            colors={tokens(theme.palette.mode).nivoColorScheme}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
            }}
            axisBottom={{
              orient: "bottom",
              tickRotation: -45,
              legend: "Time (Most Recent → Left)",
              legendOffset: 36,
              legendPosition: "middle",
              tickSize: 5,
              tickPadding: 5,
            }}
            axisLeft={{
              orient: "left",
              legend: viewMode === "liquidity" ? "Liquidity Estimate" : "Trade Count",
              legendOffset: -40,
              legendPosition: "middle",
              tickSize: 5,
              tickPadding: 5,
            }}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh
            enableGridX={false}
            enableGridY={false}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        ) : (
          <Typography variant="body1">
            No data yet. Select a pair and time range.
          </Typography>
        )}
      </Box>
    </Box>
  );
};


export default LiquidityTrendChart;
