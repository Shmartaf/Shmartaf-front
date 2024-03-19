import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SkillTable = ({ template }) => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    console.log('template', template);
    const handleAddSkill = (skill) => {
        // Logic to add the selected skill
        console.log('Skill added:', skill);
    };

    const handleRemoveSkill = (skill) => {
        // Logic to remove the selected skill
        console.log('Skill removed:', skill);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="skill table">
                <TableHead>
                    <TableRow>
                        <TableCell>Skill Name</TableCell>
                        <TableCell>Needs It Could Help</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {template.map((item) => (
                        <TableRow key={item.skill.id}>
                            <TableCell>{item.skill.skillname}</TableCell>
                            <TableCell>
                                {item.skill.skill_needs.map((need) => (
                                    <div key={need.need.id}>{need.need.needname}</div>
                                ))}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleAddSkill(item.skill)}>+</Button>
                                <Button onClick={() => handleRemoveSkill(item.skill)}>-</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SkillTable;
