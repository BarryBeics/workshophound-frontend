import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/tokens";

export const CardTitle = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Typography
      color={colors.scalpelTeal[400]}
      variant="h5"
      fontWeight="600"
    >
      {children}
    </Typography>
  );
};

export default CardTitle;