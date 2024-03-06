import { Box, Typography } from "@mui/material";
import humanImage from "../assets/human.png";
import { useContext } from "react";
import { BabysitterContext } from "../context/BabysitterContext";
import JobOpp from "./JobOpp";
import UpcomingEvents from "./UpcomingEvents";
import Availability from "./Availability";

const Tables = () => {
  const { user } = useContext(BabysitterContext).state;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#F8F7F1",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#F8F7F1",
          p: 2,
          width: "100",

          borderRadius: 2,
        }}
      >
        <img src={humanImage} style={{ width: "30px", height: "30px" }} />{" "}
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      <Availability />
      <JobOpp />
      <UpcomingEvents />
    </Box>
  );
};
export default Tables;
