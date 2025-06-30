// React
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

// GraphQL
import { fetchHistoricPrice } from "../utils/fetchHistoricPrice";
import useGraphQLClient from "../hooks/useGraphQLClient";

const TrendingPairsChart = () => {
  const [priceData, setPriceData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const nivoTheme = colors.nivoTheme;
  const nivoColors = colors.nivoColorScheme;
  const client = useGraphQLClient();

  const fixedSymbols = ["BTCUSDT", "ETHUSDT", "XRPUSDT"];
  const timeFrameQty = 12; // 1-hour worth of 5-minute increments (if available)

  useEffect(() => {
    const fetchDataForSymbol = async (symbol) => {
      try {
        const rawData = await fetchHistoricPrice(client, symbol, timeFrameQty);

        const cleanedData = rawData
          .slice()
          .reverse()
          .filter((entry) => {
            const pricePoint = entry?.Pair?.find((p) => p?.Symbol === symbol);
            return entry?.Timestamp && pricePoint?.PercentageChange;
          })
          .map((entry) => {
            const pricePoint = entry.Pair.find((p) => p.Symbol === symbol);
            const rawChange = pricePoint?.PercentageChange;

            const yValue = parseFloat(rawChange);
            if (!isFinite(yValue)) return null;

            return {
              x: new Date(entry.Timestamp * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              y: yValue,
            };
          })
          .filter(Boolean);

        if (!cleanedData.length) return;

        setPriceData((prev) => [
          ...prev.filter((s) => s.id !== symbol),
          { id: symbol, data: cleanedData },
        ]);
      } catch (error) {
        console.error(`Error fetching price data for ${symbol}:`, error);
      }
    };

    fixedSymbols.forEach((symbol) => fetchDataForSymbol(symbol));

    setPriceData((prev) =>
      prev.filter((entry) => fixedSymbols.includes(entry.id))
    );
  }, [client]);

return (
    <Box height="100%" width="700px">
      {priceData.length > 0 ? (
        <ResponsiveLine
          data={priceData}
          theme={nivoTheme}
          colors={nivoColors}
          margin={{ top: 50, right: 50, bottom: 100, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
          axisBottom={{
            tickRotation: -45,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            legend: "% Change",
            legendOffset: -40,
            legendPosition: "middle",
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
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 60,
              itemWidth: 80,
              itemHeight: 20,
              itemsSpacing: 10,
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#fff",
                    itemBackground: "rgba(0, 0, 0, 0.1)",
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        <Typography variant="body1">
          No data yet. Please check backend availability.
        </Typography>
      )}
    </Box>
  );
};

export default TrendingPairsChart;
