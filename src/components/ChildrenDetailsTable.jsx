import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    MenuItem,
} from '@mui/material';
import CustomModal from './Modal';
import ChildDetails from './ChildDetails';
import { useDataContext } from '../context/DataContext';
import { Typography, Select, Menu } from 'antd';
import { BASE_URL } from '../api';
import zIndex from '@mui/material/styles/zIndex';

// const { Option } = Select;

const ChildrenTable = ({ children }) => {
    const [selectedChild, setSelectedChild] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showNeedModal, setShowNeedModal] = useState(false);
    const [selectedNeed, setSelectedNeed] = useState(null);
    const [needRank, setNeedRank] = useState(1); // Default rank
    const { needs } = useDataContext();
    console.log("children", children);
    const handleViewDetails = (child) => {
        setSelectedChild(child);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // setSelectedChild(null);
    };

    const handleCloseNeedModal = () => {
        setShowNeedModal(false);
    };

    const handleNeedsOptions = () => {
        setShowNeedModal(true);
    };

    const handleNeedSelection = (need) => {
        setSelectedNeed(need);
    };

    const handleRankChange = (value) => {
        setNeedRank(value);
    };

    const handleAddNeed = () => {
        // Add logic to add selectedNeed with needRank to your data
        console.log("Selected Need:", selectedNeed, "Rank:", needRank);
        const result = fetch(`${BASE_URL}/parents/${user.id}/requirements/${selectedChild.id}/${selectedNeed}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ needrank: needRank }),
        });
        console.log("result", result);

        handleCloseNeedModal();
        // You can add the selected need and rank to your data here
        // handleCloseModal(); // Close modal after adding need

    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Birthdate</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Needs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {children.map((child) => (
                            <TableRow key={child.id}>
                                <TableCell>{child.name}</TableCell>
                                <TableCell>{child.birthdate}</TableCell>
                                <TableCell>{child.gender}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewDetails(child)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleNeedsOptions()}
                                    >
                                        Needs
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomModal isOpen={showModal} onClose={handleCloseModal}>
                <ChildDetails child={selectedChild} />
            </CustomModal>
            <CustomModal isOpen={showNeedModal} onClose={handleCloseNeedModal}>
                <>
                    <Typography variant="h6">Select Need</Typography>
                    <Select
                        // style={{ width: '100%', zIndex: 9999 }} // Set a high z-index for the dropdown
                        placeholder="Select a need"
                        onChange={handleNeedSelection}
                    >
                        {needs.map((need) => (
                            <MenuItem key={need.id} value={need.id} >
                                {need.needname}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography variant="h6" mt={2}>
                        Select Rank
                    </Typography>
                    <Select style={{ zIndex: 9999 }}
                        // style={{ width: '100%', zIndex: 9999 }} // Set a high z-index for the dropdown
                        defaultValue={1}
                        onChange={handleRankChange}
                    >
                        {[1, 2, 3, 4, 5].map((rank) => (
                            <MenuItem key={rank} value={rank} >
                                {rank}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={handleAddNeed}>
                        Add Need
                    </Button>
                </>
            </CustomModal >

        </>
    );
};

export default ChildrenTable;
