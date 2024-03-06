import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const FavoriteCard = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "45%",
        height: "400px",
        justifyContent: "start",
        alignItems: "center",
        padding: "10px",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <img src={props.image} style={{ width: "80px", borderRadius: "50%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};
export default FavoriteCard;
