import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export const CardTitle = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Typography
      color={colors.grey[100]}
      variant="h5"
      fontWeight="600"
      sx={{ padding: "25px 30px 0 30px" }}
    >
      {children}
    </Typography>
  );
};

export default CardTitle;