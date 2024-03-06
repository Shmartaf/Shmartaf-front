import * as React from "react";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const QuickFind = () => {
  const [time, setTime] = React.useState("10");

  const handleChange = (event) => {
    setTime(event.target.value);
  };
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
      <Typography variant="h6">Quick Find</Typography>
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
        <Autocomplete
          disablePortal
          id="location-combo-box"
          options={citiesList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
        <Autocomplete
          disablePortal
          id="child-combo-box"
          options={childList}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Child" />
          )}
        />
        <TextField
          type="date"
          label="Select Date"
          sx={{ width: 200 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          sx={{
            width: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          displayEmpty
          value={time}
          onChange={handleChange}
          startAdornment={<AccessTimeIcon />}
        >
          <MenuItem value={"10"}>10 AM</MenuItem>
          <MenuItem value={"12"}>12 PM</MenuItem>
          <MenuItem value={"16"}>4 PM</MenuItem>
        </Select>
        <div>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Check
          </Button>
        </div>
      </Box>
    </Box>
  );
};
export default QuickFind;

const citiesList = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
];

const childList = [
  "John",
  "Doe",
  "Jane",
  "Doe",
  "Michael",
  "Jackson",
  "John",
  "Doe",
  "Jane",
  "Doe",
  "Michael",
  "Jackson",
];
