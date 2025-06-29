// src/components/TradeOutcomePieChart.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";

const TradeOutcomePieChart = ({ summary }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!summary) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <Typography>No trade outcome data available</Typography>
      </Box>
    );
  }

  const pieData = [
    {
      id: "WIN",
      label: "Win",
      value: summary.WIN,
      color: colors.scalpelTeal[400],
    },
    {
      id: "LOSS",
      label: "Loss",
      value: summary.LOSS,
      color: colors.houndGold[400],
    },
    {
      id: "TIMEOUT",
      label: "Timeout",
      value: summary.TIMEOUT,
      color: colors.grey[400],
    },
  ];

  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        colors={tokens(theme.palette.mode).nivoColorScheme}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    </Box>
  );
};

export default TradeOutcomePieChart;
