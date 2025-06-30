// theme/tokens.js

export const tokens = (mode) => {
  const shared = {
    houndGold: {
      100: "#f2e9d8",
      200: "#e5d3b1",
      300: "#d8be8b",
      400: "#cba864",
      500: "#be923d",
      600: "#987531",
      700: "#725825",
      800: "#4c3a18",
      900: "#261d0c",
    },
    scalpelTeal: {
      100: "#d1e6e5",
      200: "#a2cdcc",
      300: "#74b4b2",
      400: "#459b99",
      500: "#17827f",
      600: "#126866",
      700: "#0e4e4c",
      800: "#093433",
      900: "#051a19",
    },
    grey: {
      100: "#f9f9f9",
      200: "#e0e0e0",
      300: "#c2c2c2",
      400: "#a3a3a3",
      500: "#858585",
      600: "#666666",
      700: "#4d4d4d",
      800: "#333333",
      900: "#1a1a1a",
    },
    softRed: {
      100: "#fbeaea",
      200: "#f5c5c5",
      300: "#ef9f9f",
      400: "#e97a7a",
      500: "#e35454",
      600: "#b34646",
      700: "#843838",
      800: "#542929",
      900: "#251b1b",
    },
    nivoColorScheme: [
      "#e8c1a0",
      "#f47560",
      "#f1e15b",
      "#e8a838",
      "#61cdbb",
      "#97e3d5",
      "#f1c0e8",
    ],
  };

  const light = {
    background: {
      default: shared.grey[200],
      paper: "#ffffff",
    },
    text: {
      primary: shared.grey[900],
      secondary: shared.grey[600],
    },
  };

  const dark = {
    background: {
      default: shared.grey[900],
      paper: shared.grey[800],
    },
    text: {
      primary: shared.grey[100],
      secondary: shared.grey[300],
    },
  };

  return {
    ...shared,
    ...(mode === "dark" ? dark : light),
  };
};
