import Box from "@mui/material/Box";
import EventsTable from "../components/EventsTable";
import Header from "../components/Header";
import Map from "../components/Map";
import QuickFind from "../components/QuickFind";
import humanImage from "../assets/human.png";
import { useContext } from "react";
import { useAuth } from "../AuthContext";

const ParentDashboard = () => {
  console.log("ParentDashboard");
  //const { user } = useContext(BabysitterContext).state;
  const { user } = useAuth();
  //console.log("user", user.userData.name);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Header name={user?.userData.user?.name} image={humanImage} />
      <EventsTable />
      <QuickFind />
      <Map />
    </Box>
  );
};
export default ParentDashboard;
