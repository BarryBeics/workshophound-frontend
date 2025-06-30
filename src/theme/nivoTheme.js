// theme/nivoTheme.js

import { tokens } from "./tokens";

export const generateNivoTheme = (muiTheme) => {
  const colors = tokens(muiTheme.palette.mode);

  return {
    textColor: colors.text.primary,
    axis: {
      domain: {
        line: {
          stroke: colors.grey[600],
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fill: colors.text.primary,
        },
      },
      ticks: {
        line: {
          stroke: colors.grey[600],
          strokeWidth: 1,
        },
        text: {
          fill: colors.text.primary,
        },
      },
    },
    legends: {
      text: {
        fill: colors.text.primary,
      },
    },
    tooltip: {
      container: {
        background: muiTheme.palette.background.paper,
        color: colors.text.primary,
        fontSize: 12,
      },
    },
    grid: {
      line: {
        stroke: colors.grey[700],
        strokeWidth: 1,
      },
    },
  };
};
