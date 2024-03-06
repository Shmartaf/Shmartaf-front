import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import GridViewIcon from "@mui/icons-material/GridView";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import PortraitIcon from "@mui/icons-material/Portrait";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAuth } from "../AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { BabysitterContext } from "../context/BabysitterContext";

const parentRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <GridViewIcon />,
  },
  {
    name: "Find Babysitter",
    path: "/find",
    icon: <ChildFriendlyIcon />,
  },
  {
    name: "Contacted",
    path: "/contacted",
    icon: <PortraitIcon />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <NotificationsNoneOutlinedIcon />,
  },
];

const babysitterRoutes = [
  {
    name: "Dashboard",
    path: "/babysitterdashboard",
    icon: <GridViewIcon />,
  },
  {
    name: "Contacted",
    path: "/contacted",
    icon: <PortraitIcon />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <NotificationsNoneOutlinedIcon />,
  },
  {
    name: "Reviews",
    path: "/reviews",
    icon: <StarOutlineIcon />,
  },
  {
    name: "Schedule",
    path: "/schedule",
    icon: <CalendarMonthIcon />,
  },
];

const parentPersonalRoutes = [
  {
    name: "Favorites",
    path: "/favorites",
    icon: <StarOutlineIcon />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

const babysitterPersonalRoutes = [
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

const SidebarItem = ({ route, pathname }) => (
  <ListItem key={route.name}>
    <ListItemButton
      component={Link}
      to={route.path}
      sx={{
        color: "white",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#0069FE",
        },
        "&.Mui-selected": {
          backgroundColor: "#0069FE !important",
        },
      }}
      selected={pathname === route.path}
    >
      <ListItemIcon sx={{ color: "white" }}>{route?.icon}</ListItemIcon>
      <ListItemText primary={route.name} />
    </ListItemButton>
  </ListItem>
);

const Sidebar = () => {
  // const { state, dispatch } = useContext(BabysitterContext);
  // const { user } = state;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const routes =
    user?.userData.user.userType === "babysitter"
      ? babysitterRoutes
      : parentRoutes;
  const personalRoutes =
    user?.userData.user.userType === "babysitter"
      ? babysitterPersonalRoutes
      : parentPersonalRoutes;

  const { pathname } = useLocation();
  const logoutUser = async () => {
    try {
      const result = await logout();
      console.log("result", result);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }

    // dispatch({ type: "SET_ROLE", payload: "" });
  };
  return (
    <Box
      sx={{
        bgcolor: "#191919",
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        boxShadow: 2,
      }}
    >
      <nav style={{ width: "230px" }}>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            width: "100",
            color: "white",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "100%", maxHeight: "80%" }}
          />
        </Typography>
        <List>
          {routes.map((route) => (
            <SidebarItem key={route.name} route={route} pathname={pathname} />
          ))}
        </List>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <hr style={{ width: "60%" }}></hr>
          <div style={{ width: "60%" }}>
            <Typography variant="body1" sx={{ color: "white" }}>
              Personal{" "}
            </Typography>
          </div>
        </div>
        <List>
          {personalRoutes.map((route) => (
            <SidebarItem key={route.name} route={route} pathname={pathname} />
          ))}
        </List>
      </nav>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List>
          <ListItem>
            <ListItemButton
              onClick={logoutUser}
              sx={{ backgroundColor: "grey", color: "white", borderRadius: 2 }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
