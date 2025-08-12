// React
import React, { useEffect, useMemo, useState } from "react";

// Third-party
import { Box, Typography, MenuItem, Select, FormControl } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material/styles";

// Theme + utils
import { tokens } from "../../theme/tokens";
import { generateNivoTheme } from "../../theme/nivoTheme";

// Hooks & utils
import useGraphQLClient from "../../hooks/useGraphQLClient";
import Header from "../../components/Header";
import { fetchHistoricPrice } from "../../utils/fetchHistoricPrice";
import { useStrategies } from "../../hooks/useStrategies";

// GQL queries
import {
  READ_ATR_SYMBOLS_QUERY,
  READ_ATR_TIMESTAMPS_QUERY,
  READ_ATR_REPORT_BY_SYMBOL_AND_TIMESTAMP_QUERY,
} from "../../graph/reports/queries";

// ---- small helpers ----
async function fetchATRSymbols(client) {
  const { readATRSymbols } = await client.request(READ_ATR_SYMBOLS_QUERY);
  return readATRSymbols ?? [];
}
async function fetchATRTimestamps(client, symbol) {
  const { readATRTimestamps } = await client.request(READ_ATR_TIMESTAMPS_QUERY, { symbol });
  return (readATRTimestamps ?? []).slice().sort((a, b) => b - a);
}
async function fetchATRReport(client, symbol, timestamp) {
  const { readATRReportBySymbolAndTimestamp } = await client.request(
    READ_ATR_REPORT_BY_SYMBOL_AND_TIMESTAMP_QUERY,
    { symbol, timestamp }
  );
  return readATRReportBySymbolAndTimestamp ?? null;
}

// ---------------------------
// Component
// ---------------------------
const ATRChart = () => {
  const client = useGraphQLClient();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const nivoTheme = generateNivoTheme(theme);

  // strategies include BotInstanceName, TradeDuration, IncrementsATR
  const { data: strategies } = useStrategies();

  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);

  const [prices, setPrices] = useState([]);
  const [atrReport, setAtrReport] = useState(null);

  // load symbols on mount
  useEffect(() => {
    if (!client) return;
    let cancelled = false;
    (async () => {
      try {
        const syms = await fetchATRSymbols(client);
        if (cancelled) return;
        setSymbols(syms);
        if (syms.length) setSelectedSymbol((prev) => prev || syms[0]);
      } catch (e) {
        console.error("readATRSymbols failed", e);
        setSymbols([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [client]);

  // load timestamps when symbol changes
  useEffect(() => {
    if (!client) return;
    if (!selectedSymbol) {
      setTimestamps([]);
      setSelectedTimestamp(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const ts = await fetchATRTimestamps(client, selectedSymbol);
        if (cancelled) return;
        setTimestamps(ts.map(Number));
        setSelectedTimestamp(ts.length ? Number(ts[0]) : null);
      } catch (e) {
        console.error("readATRTimestamps failed", e);
        setTimestamps([]);
        setSelectedTimestamp(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [client, selectedSymbol]);

  // Load ATR report + prices using bot settings
  useEffect(() => {
    if (!client) return;
    if (!selectedSymbol || !selectedTimestamp) return;

    let cancelled = false;
    (async () => {
      try {
        // 1) ATR report snapshot
        const report = await fetchATRReport(client, selectedSymbol, selectedTimestamp);
        if (cancelled) return;
        setAtrReport(report);

        if (!report) {
          setPrices([]);
          return;
        }

        // 2) find bot settings for this report
        const bot = strategies?.find((s) => s.BotInstanceName === report.BotInstanceName);

        // sensible defaults if not found
        const tradeDurationM = Number(bot?.TradeDuration ?? 5);
        const incrementsATR = Number(bot?.IncrementsATR ?? 3);

        // candles needed equals ATR increments
        const candlesNeeded = Math.max(1, incrementsATR);

        // 3) fetch recent candles (small buffer helps if timestamps don’t align)
        const raw = await fetchHistoricPrice(client, selectedSymbol, candlesNeeded + 10);

        // 4) sort + trim to <= report.Timestamp and take the last N (candlesNeeded)
        const sorted = (raw ?? []).slice().sort((a, b) => a.Timestamp - b.Timestamp);
        const filtered = sorted
          .filter((d) => d.Timestamp <= report.Timestamp)
          .slice(-candlesNeeded);

        if (!cancelled) setPrices(filtered);
      } catch (e) {
        console.error("load ATR report/prices failed", e);
        if (!cancelled) {
          setAtrReport(null);
          setPrices([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [client, selectedSymbol, selectedTimestamp, strategies]);

  // Build Nivo series
  const chartData = useMemo(() => {
    if (!prices?.length) return [];

    const priceLine = {
      id: `${selectedSymbol} Price`,
      data: prices.map((d) => ({
        x: new Date(d.Timestamp * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        y: parseFloat(d.Pair?.[0]?.Price ?? "0"),
      })),
    };

    if (!atrReport) return [priceLine];

    const xLabels = prices.map((d) =>
      new Date(d.Timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    const flatSeries = (id, value) => ({
      id,
      data: xLabels.map((x) => ({ x, y: value })),
    });

    const atrLine = flatSeries(`${selectedSymbol} ATR`, atrReport.Atr);
    const upperLine = flatSeries(`${selectedSymbol} Upper`, atrReport.UpperLimit);
    const lowerLine = flatSeries(`${selectedSymbol} Lower`, atrReport.LowerLimit);

    return [priceLine, upperLine, lowerLine, atrLine];
  }, [prices, atrReport, selectedSymbol]);

  return (
    <Box>
      <Header
        title="ATR VOLATILITY CHART"
        subtitle="Select a symbol and ATR report timestamp to see price vs ATR envelope."
      />

      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        {/* Symbol select */}
        <Box backgroundColor="background.paper" borderRadius="5px" p={2} minWidth={260}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 1, color: colors.grey[100] }}>
              Symbol
            </Typography>
            <Select
              value={selectedSymbol || ""}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              displayEmpty
            >
              {symbols.length === 0 && (
                <MenuItem disabled value="">
                  No symbols found
                </MenuItem>
              )}
              {symbols.map((sym) => (
                <MenuItem key={sym} value={sym}>
                  {sym}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Timestamp select */}
        <Box backgroundColor="background.paper" borderRadius="5px" p={2} minWidth={260}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" sx={{ mb: 1, color: colors.grey[100] }}>
              Report Timestamp
            </Typography>
            <Select
                value={selectedTimestamp ?? ""}
                onChange={(e) => setSelectedTimestamp(Number(e.target.value))}
                displayEmpty
                >
                {timestamps.map((ts) => (
                    <MenuItem key={ts} value={Number(ts)}>
                    {new Date(Number(ts) * 1000).toLocaleString()}
                    </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {chartData.length > 0 ? (
        <Box height="520px">
          <ResponsiveLine
            data={chartData}
            theme={nivoTheme}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            axisBottom={{
              orient: "bottom",
              tickRotation: -45,
              legend: "Time",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              legend: "Price",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={4}
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
                itemWidth: 100,
                itemHeight: 18,
                symbolSize: 10,
                symbolShape: "circle",
              },
            ]}
          />
        </Box>
      ) : (
        <Typography variant="body1">Pick a symbol and timestamp to begin.</Typography>
      )}

      {/* Meta block */}
      {atrReport && (
        <Box mt={2} color={colors.grey[200]}>
          <Typography variant="caption">
            Report @ {new Date(atrReport.Timestamp * 1000).toLocaleString()} — Price:{" "}
            {atrReport.Price.toFixed(4)} | ATR: {atrReport.Atr.toFixed(4)} | Upper:{" "}
            {atrReport.UpperLimit.toFixed(4)} | Lower: {atrReport.LowerLimit.toFixed(4)}
          </Typography>
          {(() => {
            const bot = strategies?.find(
              (s) => s.BotInstanceName === atrReport.BotInstanceName
            );
            const tradeDurationM = Number(bot?.TradeDuration ?? 5);
            const incrementsATR = Number(bot?.IncrementsATR ?? 3);
            return (
              <Typography variant="caption" display="block">
                Bot: {atrReport.BotInstanceName} · Window: {tradeDurationM * incrementsATR}m (
                {tradeDurationM}m × {incrementsATR})
              </Typography>
            );
          })()}
        </Box>
      )}
    </Box>
  );
};

export default ATRChart;
