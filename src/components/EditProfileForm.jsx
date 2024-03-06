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
  Typography,
  CircularProgress,
} from "@mui/material";

const EditProfileForm = ({ profileData, onSaveChanges, onClose, loading }) => {
  const [editedProfile, setEditedProfile] = useState({ ...profileData });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      await onSaveChanges(editedProfile);
      onClose(); // Optionally close the dialog after successful save
    } catch (error) {
      console.error("Failed to save changes:", error);
      // Handle error as needed
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={editedProfile.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={editedProfile.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={editedProfile.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={editedProfile.city}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Street"
          name="street"
          value={editedProfile.street}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={editedProfile.gender}
            onChange={handleInputChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        {/* Display children information */}
        <Typography variant="h6" mt={2}>
          Children
        </Typography>
        {editedProfile.childrens.map((child, index) => (
          <div key={index}>
            <Typography>
              Name:
              <TextField
                label="Name"
                name={`childName${index}`}
                value={child.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Typography>
            <Typography>
              Birthdate:
              <TextField
                label="Birthdate"
                name={`childBirthdate${index}`}
                value={child.birthdate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Typography>
            <Typography>
              Gender:
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  name={`childGender${index}`}
                  value={child.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            {/* Display other child information as needed */}
            <hr />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSaveChanges}
          color="primary"
          disabled={loading || isSaving}
        >
          {isSaving ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </DialogActions>
    </>
  );
};

export default EditProfileForm;
