import { PieChart } from "@mui/x-charts/PieChart";
import { Card, Typography, Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const StatsCard = () => {
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 250,
        minHeight: 350,
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
        <Typography variant="h7" color={"#8a8a8a"}>
          Reviews
        </Typography>
        <Typography
          variant="body2"
          color={"gray"}
          sx={{
            backgroundColor: "#f1f1f1",
            p: 1,
            borderRadius: 1,
          }}
        >
          Today
        </Typography>
      </Box>
      <PieChart
        series={[
          {
            innerRadius: 60,
            outerRadius: 80,
            paddingAngle: 5,
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={330}
        height={150}
        slotProps={{
          legend: { hidden: true },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* hired */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <FiberManualRecordIcon color="primary" /> Total Hired
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            54%
            <ArrowUpwardIcon color="success" />
          </Box>
        </Box>
        {/* canceled */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <FiberManualRecordIcon color="success" /> Total Canceled
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            20%
            <ArrowUpwardIcon color="success" />
          </Box>
        </Box>
        {/* pending */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <FiberManualRecordIcon color="error" /> Total Pending
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            26%
            <ArrowDownwardIcon color="error" />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
export default StatsCard;
