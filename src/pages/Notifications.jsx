import Box from "@mui/material/Box";
import NotificationCard from "../components/NotificationCards";
// impport api

// babysitters = api.get("/babysitters)

const notification = [
  {
    name: "new message",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Tel Aviv",
    date: "12.2",
    id: "xyzz1",
  },
  {
    name: "new follower",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Ramat Gan",
    date: "10.3",
    id: "xCzGsz2",
  },
  {
    name: "friend request",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Haifa",
    date: "23.5",
    id: "xyFFFzz3",
  },
];

const Notifications = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "25px",
        backgroundColor: "#F8F7F1",
        minHeight: "100vh",
      }}
    >
      {notification.map((notification) => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </Box>
  );
};
export default Notifications;
