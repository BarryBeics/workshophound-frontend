import { Card, CardContent, Box, Grid } from "@mui/material";
import CardTitle from "../components/CardTitle";

const DashboardCard = ({ cardTitle, children, height = "300px", xs = 12, md = 6 }) => {
  return (
    <Grid item xs={xs} md={md}>
      <Card
        elevation={3}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          height,
        }}
      >
         <CardContent sx={{ flexGrow: 1, height: "100%", boxSizing: "border-box" }}>
          {cardTitle && (
            <CardTitle>{cardTitle}</CardTitle>

          )}
          <Box sx={{ height: "100%" }}>
            {children}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DashboardCard;
