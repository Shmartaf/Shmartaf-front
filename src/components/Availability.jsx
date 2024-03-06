import { Box, Button, Card, TextField, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Availability = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        width: "100%",
        pr: 2,
        justifyContent: "space-between",
        backgroundColor: "#F8F7F1",
      }}
    >
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 250,
          width: "100%",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography>Check my Availability</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField type="date" size={"small"} />
          <TextField type="time" size={"small"} />
          <Button variant="contained">Check</Button>
        </Box>
      </Card>
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: 2,
          minWidth: 130,
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ color: "green", width: "100px", height: "100px" }}
        />
      </Card>
    </Box>
  );
};
export default Availability;
