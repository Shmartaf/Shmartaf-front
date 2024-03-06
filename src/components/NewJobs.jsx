import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Card, Typography, Box } from "@mui/material";

const NewJobs = () => {
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
        }}
      >
        <Typography variant="h7" color={"#8a8a8a"}>
          New potential jobs
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
          Week
        </Typography>
      </Box>
      <hr></hr>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">7</Typography>
        <Typography
          variant="body2"
          color={"red"}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
          }}
        >
          <ArrowDownwardIcon />
          1.5%
        </Typography>
      </Box>
      <Typography variant="body2" color={"gray"}>
        Compared to last week
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="body2" color={"8a8a8a"}>
          Last week pffers
        </Typography>
        <Typography variant="body2" color={"8a8a8a"}>
          16
        </Typography>
      </Box>
    </Card>
  );
};
export default NewJobs;
