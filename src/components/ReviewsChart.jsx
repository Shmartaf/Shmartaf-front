import { PieChart } from "@mui/x-charts/PieChart";
import { Card, Typography, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const ReviewsChart = () => {
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 250,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h7" color={"#8a8a8a"}>
            Reviews
          </Typography>
          <Typography variant="h4" color={"#000"}>
            12
          </Typography>
          <Typography variant="h7" color={"#8a8a8a"}>
            people left a review
          </Typography>
        </Box>
        <InfoIcon sx={{ color: "gray" }} />
      </Box>
      <hr></hr>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={330}
        height={150}
      />
    </Card>
  );
};
export default ReviewsChart;
