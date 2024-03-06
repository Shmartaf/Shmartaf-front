import { Box, Typography } from "@mui/material";
import NewJobs from "./NewJobs";
import ReviewsChart from "./ReviewsChart";
import StatsChart from "./StatsChart";
const WeeklyStats = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "start",
        alignItems: "start",
        padding: "10px",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={"bold"}
        mt={2}
        ml={2}
        mb={0}
        gutterBottom={false}
      >
        Weekly Statistics
      </Typography>
      <Typography variant="body" ml={2} mt={0}>
        {new Date().toDateString()}
      </Typography>
      <NewJobs />
      <ReviewsChart />
      <StatsChart />
    </Box>
  );
};
export default WeeklyStats;
