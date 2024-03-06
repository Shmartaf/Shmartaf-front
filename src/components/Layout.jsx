import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <div style={{ overflow: "auto", width: "100%" }}>
        <Outlet />
      </div>
    </Box>
  );
};

export default Layout;
