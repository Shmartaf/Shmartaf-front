import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import map_placeholder from "../assets/map_placeholder.png";

const Map = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: 2,
        margin: "20px",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Live Available Babysitters</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <img src={map_placeholder} style={{ width: "100%", height: "100%" }} />
      </Box>
    </Box>
  );
};
export default Map;
