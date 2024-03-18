import React from 'react';
import { Typography } from '@mui/material';

const ProfileDetails = ({ profile }) => {
    return (
        <>
            <Typography variant="h6" mt={2}>
                First Name
            </Typography>
            <Typography>{profile.user.name.split(' ')[0]}</Typography>
            <Typography variant="h6" mt={2}>
                Last Name
            </Typography>
            <Typography>
                {profile.user.name.split(' ')[1]} {profile.user.name.split(' ')[2]}
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
        </>
    );
};

export default ProfileDetails;