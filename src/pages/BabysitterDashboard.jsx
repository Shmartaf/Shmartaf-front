import Box from "@mui/material/Box";
import WeeklyStats from "../components/WeeklyStats";
import Tables from "../components/Tables";

const BabysitterDashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#F8F7F1",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <WeeklyStats />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 3,
          width: "100%",
          backgroundColor: "#Fff",
        }}
      >
        <Tables />
      </Box>
    </Box>
  );
};
export default BabysitterDashboard;
