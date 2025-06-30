import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme/tokens";

const ThemedDataGrid = ({
  rows,
  columns,
  height = "75vh",
  width = "100%", // <- added default width
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="40px 0 0 0"
      height={height}
      width={width} // <- now applies width
      sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.scalpelTeal[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "background.paper",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.scalpelTeal[400],
        },
        ...sx,
      }}
    >
      <DataGrid rows={rows} columns={columns} {...props} />
    </Box>
  );
};

export default ThemedDataGrid;
