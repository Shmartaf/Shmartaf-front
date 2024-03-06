import { useState, useEffect } from "react";
import humanImage from "../assets/human.png";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../AuthContext";
import { BASE_URL } from "../api";
import CustomModal from "../components/Modal";
import EditProfileForm from "../components/EditProfileForm";
import ChildForm from "../components/ChildForm";
import CircularProgress from "@mui/material/CircularProgress";

// const profile = {
//   firstname: "Nurit",
//   lastname: "Levi",
//   phone: "058-1234567",
//   email: "nuritlevi@me.com",
//   location: "Rishon Lezion",
//   address: "123 Main Street",
//   description:
//     "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   image: humanImage,
//   tag: "6485",
//   rating: 4.5,
//   reviews: 100,
// };

const Settings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [addChildModalOpen, setAddChildModalOpen] = useState(false);

  const openEditProfileModal = () => setEditProfileModalOpen(true);
  const closeEditProfileModal = () => setEditProfileModalOpen(false);

  const openAddChildModal = () => setAddChildModalOpen(true);
  const closeAddChildModal = () => setAddChildModalOpen(false);

  const fetchProfile = async () => {
    try {
      if (user && user.userData.user.userType === "babysitter") {
        const response = await fetch(`${BASE_URL}/babysitters/${user.id}`);
        const data = await response.json();
        setProfile(data);
        setLoading(false); // Set loading to false after data is fetched
      } else {
        const response = await fetch(`${BASE_URL}/parents/${user.id}`);
        const data = await response.json();
        console.log(data);
        setProfile(data);
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch profile, please try again.");
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const SubmitEditProfle = async (editedProfile) => {
    try {
      const response = await fetch(`${BASE_URL}/parents/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProfile),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setProfile(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to Edit profile, please try again.");
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const handleSnackBarClose = () => {
    setError(null);
  };

  const handleSaveChild = async (childData) => {
    try {
      console.log("childData", childData);

      const response = await fetch(`${BASE_URL}/parents/${user.id}/children`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(childData),
      });

      console.log("POST response status:", response.status);
      const responseData = await response.json();
      console.log("POST response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add child");
      }
      fetchProfile();
      closeAddChildModal();
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add child, please try again.");
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (profile) {
      return;
    }
    setTimeout(() => {
      fetchProfile();
    }, 4000);
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (!profile) {
    // Handle the case when the profile is not available
    return <div>Profile not found.</div>;
  }
  // const profile = await fatchProfile(user.id)
  // console.log(profile)
  // console.log(profile.data)
  // console.log(profile['user']);
  // console.log("Profile.user",profile.user)
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "0px 30px",
        gap: "5px",
      }}
    >
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
          <img src={humanImage} style={{ width: "50px", height: "50px" }} />
          <Typography variant="h5">{profile.user.name}</Typography>
        </div>
      </Box>

      <Typography variant="h6" mt={2}>
        First Name
      </Typography>
      <Typography>{profile.user.name.split(" ")[0]}</Typography>
      <Typography variant="h6" mt={2}>
        Last Name
      </Typography>
      <Typography>
        {profile.user.name.split(" ")[1]} {profile.user.name.split(" ")[2]}
      </Typography>
      <Typography variant="h6" mt={2}>
        Phone
      </Typography>
      <Typography>{profile.user.phone}</Typography>
      <Typography variant="h6" mt={2}>
        Email
      </Typography>
      <Typography>{profile.user.email}</Typography>
      <Typography variant="h6" mt={2}>
        Location
      </Typography>
      <Typography>{profile.user.city}</Typography>
      <Typography variant="h6" mt={2}>
        Address
      </Typography>
      <Typography>{profile.user.street}</Typography>
      <Typography variant="h6" mt={2}>
        Description
      </Typography>

      <Typography>{profile?.description}</Typography>
      {/* Children table section */}
      {profile.userType === "parent" && profile.childrens && (
        <>
          <Typography variant="h6" mt={2}>
            Children
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Birthdate</TableCell>
                  <TableCell>Gender</TableCell>
                  {/* Add other columns as needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {profile.childrens.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>{child.name}</TableCell>
                    <TableCell>{child.birthdate}</TableCell>
                    <TableCell>{child.gender}</TableCell>
                    {/* Add other cells as needed */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display={"flex"} gap={"10px"}>
            <Button variant="contained" onClick={openAddChildModal}>
              Add Child
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={openEditProfileModal}
            >
              Edit Profile
            </Button>
          </Box>
        </>
      )}

      {/* Modals */}
      <CustomModal
        isOpen={editProfileModalOpen}
        onClose={closeEditProfileModal}
      >
        <EditProfileForm
          profileData={profile}
          onSaveChanges={(editedProfile) => {
            console.log("edited profile", editedProfile);
            SubmitEditProfle(editedProfile);
            closeEditProfileModal();
            loading((loading) => !loading);
          }}
        />
        {/* Content for the Edit Profile Modal goes here */}
      </CustomModal>

      <CustomModal isOpen={addChildModalOpen} onClose={closeAddChildModal}>
        <ChildForm onSaveChild={handleSaveChild} onClose={closeAddChildModal} />
      </CustomModal>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message={error}
      />
    </Box>
  );
};
export default Settings;
