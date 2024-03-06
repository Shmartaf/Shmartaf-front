import React, { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ChildForm = ({ onSaveChild, onClose }) => {
  const [childData, setChildData] = useState({
    name: "",
    birthdate: "",
    gender: "",
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChild = () => {
    onSaveChild(childData);
  };

  return (
    <>
      <DialogTitle>Add Child</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={childData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Birthdate"
          name="birthdate"
          type="date"
          value={childData.birthdate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={childData.gender}
            onChange={handleInputChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        {/* Add other fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChild} color="primary">
          Save Child
        </Button>
      </DialogActions>
    </>
  );
};

export default ChildForm;
