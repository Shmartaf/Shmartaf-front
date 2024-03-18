import { useState, useEffect } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../AuthContext';
import { BASE_URL } from '../api';
import CustomModal from '../components/Modal';
import EditProfileForm from '../components/EditProfileForm';
import ChildForm from '../components/ChildForm';
import CircularProgress from '@mui/material/CircularProgress';
import { useDataContext } from '../context/DataContext';
import ProfileDetails from './ProfileDetails';
import ChildrenTable from './ChildrenDetailsTable';

const Settings = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
    const [addChildModalOpen, setAddChildModalOpen] = useState(false);

    const { babysitters, parents } = useDataContext();
    const openEditProfileModal = () => setEditProfileModalOpen(true);
    const closeEditProfileModal = () => setEditProfileModalOpen(false);

    const openAddChildModal = () => setAddChildModalOpen(true);
    const closeAddChildModal = () => setAddChildModalOpen(false);


    const fetchProfile = async () => {
        try {
            if (user && user.userData.user.userType === "babysitter") {
                const babysitter = babysitters.find((b) => b.id === user.id);
                console.log("babysitter profile data", babysitter);
                setProfile(babysitter);
                setLoading(false); // Set loading to false after data is fetched
            } else {
                const parent = parents.find((p) => p.id === user.id);
                console.log("parent profile data", parent);
                setProfile(parent);
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


    const handleSnackBarClose = () => {
        setError(null);
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
        return <div>Profile not found.</div>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: '0px 30px',
                gap: '5px',
            }}
        >
            {/* Render ProfileDetails component */}
            <ProfileDetails profile={profile} />

            {/* Render ChildrenTable component for parents */}
            {profile.user.userType === 'parent' && profile.childrens && (
                <>
                    <Typography variant="h6" mt={2}>
                        Children
                    </Typography>
                    <ChildrenTable children={profile.childrens} />
                    <Box mt={2} display={'flex'} gap={'10px'}>
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
            <CustomModal isOpen={editProfileModalOpen} onClose={closeEditProfileModal}>
                <EditProfileForm
                    profileData={profile}
                    onSaveChanges={(editedProfile) => {
                        SubmitEditProfile(editedProfile);
                        closeEditProfileModal();
                        setLoading(!loading);
                    }}
                />
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