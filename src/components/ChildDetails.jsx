import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const ChildDetails = ({ child }) => {
    return (
        <Box>
            <Typography variant="h5">Child Details</Typography>
            <Typography>Name: {child.name}</Typography>
            <Typography>Birthdate: {child.birthdate}</Typography>
            <Typography>Gender: {child.gender}</Typography>

            {/* Render the list of needs */}
            {child.needs && child.needs.length > 0 && (
                <>
                    <Typography variant="h6" mt={2}>
                        Needs
                    </Typography>
                    <List>
                        {child.needs.map((need) => (
                            <ListItem key={need.needid}>
                                <ListItemText
                                    primary={need.need.needname}
                                    secondary={`Rank: ${need.needrank}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export default ChildDetails;