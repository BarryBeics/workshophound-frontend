// src/views/dashboard/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme/tokens";

import Header from "../../components/Header";
import TrendingPairsChart from "../../components/TrendingPairsChart";
import FearAndGreedCard from "../../components/FearAndGreedCard";
import TopGainersSnapshot from "../../components/TopGainersSnapshot";
import RecentTrades from "../../components/RecentTrades";
import TradeOutcomePieChart from "../../components/TradeOutcomePieChart";

import DashboardCard from "../../components/DashboardCard";

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
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Grid container spacing={2}>
        <DashboardCard cardTitle="Trending Pairs" xs={12} md={8} height="450px">
          <TrendingPairsChart />
        </DashboardCard>

        <DashboardCard cardTitle="Recent Trades" xs={12} md={4} height="300px">
          <RecentTrades trades={outcomeReports} />
        </DashboardCard>

        <DashboardCard
          cardTitle="Trade Outcome Ratio"
          xs={12}
          md={4}
          height="300px"
        >
          <TradeOutcomePieChart summary={outcomeSummary} />
        </DashboardCard>

        <DashboardCard
          cardTitle="Fear & Greed Index"
          xs={12}
          md={4}
          height="300px"
        >
          <FearAndGreedCard />
        </DashboardCard>

        <DashboardCard
          cardTitle="Average Gainers Snapshot"
          xs={12}
          md={4}
          height="300px"
        >
          <TopGainersSnapshot activityData={activityData} />
        </DashboardCard>
      </Grid>
    </Box>
  );
};

export default Dashboard;
