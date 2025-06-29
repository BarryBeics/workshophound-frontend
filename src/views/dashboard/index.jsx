// src/views/dashboard/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import CardTitle from "../../components/CardTitle";
import StatBox from "../../components/StatBox";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import TrendingPairsChart from "../../components/TrendingPairsChart";
import FearAndGreedCard from "../../components/FearAndGreedCard";
import TopGainersSnapshot from "../../components/TopGainersSnapshot";
import RecentTrades from "../../components/RecentTrades";
import TradeOutcomePieChart from "../../components/TradeOutcomePieChart";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import useTradeReports from "../../hooks/useTradeReports";
import { useFearAndGreedIndex } from "../../hooks/useFearAndGreedIndex";
import { useActivityReports } from "../../hooks/useActivityReports";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { outcomeReports } = useTradeReports();
  const { data: reports } = useActivityReports();
  const { data: fearAndGreed } = useFearAndGreedIndex();
  const latestActivity = reports?.[reports.length - 1];
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    if (reports?.length) setActivityData(reports);
  }, [reports]);

  const outcomeSummary = useMemo(() => {
    if (!outcomeReports?.length) return null;

    return outcomeReports.reduce(
      (acc, trade) => {
        const outcome = trade.Outcome?.toUpperCase();
        if (outcome === "WIN") acc.WIN += 1;
        else if (outcome === "LOSS") acc.LOSS += 1;
        else acc.TIMEOUT += 1;
        return acc;
      },
      { WIN: 0, LOSS: 0, TIMEOUT: 0 }
    );
  }, [outcomeReports]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* Cards Row */}
        <Box gridColumn="span 3" backgroundColor={colors.grey[700]} borderRadius="5px" display="flex" alignItems="center" justifyContent="center">
          <CardTitle>Total Trades</CardTitle>
          Placeholder
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.grey[700]} borderRadius="5px" display="flex" alignItems="center" justifyContent="center">
          <CardTitle>Pairs on the Move</CardTitle>
          <StatBox title={latestActivity?.Qty ?? "--"} subtitle="Sales Obtained" progress="0.50" increase="+21%" icon={<TimelineOutlinedIcon sx={{ color: colors.scalpelTeal[500], fontSize: "26px" }} />} />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.grey[700]} borderRadius="5px" display="flex" alignItems="center" justifyContent="center">
          <StatBox title="32,441" subtitle="New Clients" progress="0.30" increase="+5%" icon={<PersonAddIcon sx={{ color: colors.scalpelTeal[600], fontSize: "26px" }} />} />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.grey[700]} borderRadius="5px" display="flex" alignItems="center" justifyContent="center">
          <CardTitle>Fear & Greed Index</CardTitle>
          <FearAndGreedCard />
        </Box>

        {/* Charts Row */}
        <Box gridColumn="span 8" gridRow="span 3" backgroundColor={colors.grey[700]} borderRadius="5px">
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <CardTitle>Trending Pairs</CardTitle>
          </Box>
          <TrendingPairsChart />
        </Box>
        <Box gridColumn="span 4" gridRow="span 3" backgroundColor={colors.grey[700]} borderRadius="5px" overflow="auto">
          <CardTitle>Recent Trades</CardTitle>
          <RecentTrades trades={outcomeReports} />
        </Box>

        {/* Lower Stats Row */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.grey[700]} borderRadius="5px" p="30px">
          <CardTitle>Trade Outcome Ratio</CardTitle>
          <Box height="200px" mt="15px">
            <TradeOutcomePieChart summary={outcomeSummary} />
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.grey[700]} borderRadius="5px">
          <CardTitle>Sales Quantity</CardTitle>
          <Box height="250px" mt="-20px">
            <BarChart />
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.grey[700]} borderRadius="5px" padding="30px">
          <CardTitle>Average Gainers Snapshot</CardTitle>
          <Box height="200px">
            <TopGainersSnapshot activityData={activityData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
