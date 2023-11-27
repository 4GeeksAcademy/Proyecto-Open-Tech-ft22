import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//MUI:
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//Components:
import RoleCard from "../component/roleCard";

{/*This is the code for the little cards in the dashboard*/ }
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    // data de ejemplo
    const cardData = [
        { roleName: 'Role 1', average: 15, entries: 30 },
        { roleName: 'Role 2', average: 10, entries: 25 },
        { roleName: 'Role 3', average: 12, entries: 95 },
        { roleName: 'Role 4', average: 9, entries: 110 },
        { roleName: 'Role 5', average: 7, entries: 3 },
        { roleName: 'Role 6', average: 11, entries: 9 },
        { roleName: 'Role 7', average: 12, entries: 19 },
        { roleName: 'Role 8', average: 11, entries: 25 },
        // agregar mas cards
    ];


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>
                        {/* Map through the card data and render RoleCard */}
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {cardData.map((card, index) => (
                                <RoleCard key={index} {...card} />
                            ))}
                        </div>
                    </Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="mx-auto w-75">
            <Box sx={{ width: '100%', margin: 'auto' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Category Role 1" style={{ color: 'white' }} {...a11yProps(0)} />
                        <Tab label="Category Role 2" style={{ color: 'white' }} {...a11yProps(1)} />
                        <Tab label="Category Role 3" style={{ color: 'white' }} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Typography style={{ color: '#4f89ee' }}>Category Role 1</Typography>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Typography style={{ color: '#4f89ee' }}>Category Role 2</Typography>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Typography style={{ color: '#4f89ee' }}>Category Role 3</Typography>
                </CustomTabPanel>
            </Box>
        </div>
    );
}