// theme/index.js

import { createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import { tokens } from "./tokens";

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      primary: {
        main: colors.scalpelTeal[400],
      },
      secondary: {
        main: colors.houndGold[400],
      },
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      error: {
        main: colors.softRed[500],
        light: colors.softRed[300],
        dark: colors.softRed[700],
      },
    },
    typography: {
      fontFamily: ["Source Sans 3", "sans-serif"].join(","),
      fontSize: 16,
      h1: { fontSize: "2.5rem", fontWeight: 700, color: colors.text.primary },
      h2: { fontSize: "2rem", fontWeight: 600, color: colors.text.primary },
      h3: { fontSize: "1.5rem", fontWeight: 600, color: colors.text.primary },
      h4: { fontSize: "1.25rem", fontWeight: 600, color: colors.text.primary },
      h5: { fontSize: "1rem", fontWeight: 500, color: colors.text.secondary },
      h6: { fontSize: "0.875rem", fontWeight: 500, color: colors.text.secondary },
      body1: { fontSize: "1rem", color: colors.text.primary },
      body2: { fontSize: "0.875rem", color: colors.text.secondary },
    },
  };
};

// MUI Color Mode Context
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
