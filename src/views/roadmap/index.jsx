import React from "react";
import { Box, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { tokens } from "../../theme";

const roadmapData = [
  {
    phase: "Phase 1: Foundations",
    items: [
      { text: "Pull live price data across crypto pairs", done: true },
      { text: "Visualize historic price charts", done: true },
      { text: "Display simple moving averages (SMAs)", done: true },
      { text: "Show trade outcomes (win / loss / timeout)", done: true },
      { text: "Pull Fear & Greed Index data", done: true },
      { text: "Build dashboard to summarize key insights", done: true },
    ],
  },
  {
    phase: "Phase 2: Market Insights",
    items: [
      { text: "Show average gain across all coins", done: true },
      { text: "Display 24h top gainers", done: true },
      { text: "Highlight coins with strong momentum", done: true },
      { text: "Estimate liquidity from minute-by-minute data", done: false },
      { text: "Add ATR (volatility) filters", done: false },
      { text: "Sort report data in table format", done: false },
    ],
  },
  {
    phase: "Phase 3: Strategy Building",
    items: [
      { text: "Create and configure trading bots", done: false },
      { text: "Allow setting quote currency per bot", done: false },
      { text: "Simulate bot strategies on historical data", done: false },
      { text: "Filter trades by slippage and volatility", done: false },
      { text: "Refine selection logic for smarter bots", done: false },
    ],
  },
  {
    phase: "Phase 4: UX & Community",
    items: [
      { text: "Embed chat forum for user feedback", done: false },
      { text: "Add tooltips across the app", done: false },
      { text: "Use snackbars for confirmations & errors", done: false },
      { text: "Create onboarding flow for new users", done: false },
      { text: "Invite community feedback into the roadmap", done: false },
    ],
  },
];


const Roadmap = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={2} p={3} borderRadius="8px" bgcolor="background.paper">
      <Typography
        variant="h2"
        sx={{ color: colors.houndGold[500], mb: 4, fontWeight: "bold" }}
      >
        Project Roadmap
      </Typography>

      {roadmapData.map((phase, idx) => (
        <Box key={phase.phase} mb={4}>
          <Typography
            variant="h4"
            sx={{ color: colors.houndGold[400], mb: 2, fontWeight: 600 }}
          >
            {phase.phase}
          </Typography>

          <List>
            {phase.items.map((item, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  {item.done ? (
                    <CheckCircleIcon sx={{ color: colors.scalpelTeal[500] }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: colors.scalpelTeal[200] }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: item.done ? "line-through" : "none",
                        color: item.done ? colors.grey[300] : colors.grey[100],
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          {idx < roadmapData.length - 1 && <Divider sx={{ my: 3 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default Roadmap;
