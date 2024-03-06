import { Badge, InputAdornment, TextField, Typography } from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";
import Box from "@mui/material/Box";

const Header = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={props.image} style={{ width: "50px", height: "50px" }} />
        <Typography variant="h5">{props.name}</Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6rem" }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="large" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Search here"
          sx={{
            // width: "200px",
            borderRadius: 2,
            backgroundColor: "#f2f2f2",
            "& .MuiInputBase-input": {
              padding: "10px",
              fontSize: "16px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
        <Badge badgeContent={""} color="error">
          <Notifications fontSize="large" />
        </Badge>
      </div>
    </Box>
  );
};
export default Header;
