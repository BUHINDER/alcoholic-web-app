import React from 'react';
import {TabPanel} from "@mui/lab";
import {Box, Button, Typography} from "@mui/material";
import ProfileFieldUI from "./ProfileFieldUI";

const SecurityTabUI = () => {
    return (
        <TabPanel value={"2"}>
            <Typography variant={"body1"}>CHANGE PASSWORD</Typography>
            <Box component={"form"}>
                <ProfileFieldUI fieldLabel={"Current Password"} isEnabled={true}/>
                <ProfileFieldUI fieldLabel={"New Password"} isEnabled={true}/>
                <ProfileFieldUI fieldLabel={"Confirm Password"} isEnabled={true}/>
            </Box>
            <Button variant={"contained"}>Save</Button>
        </TabPanel>
    );
};

export default SecurityTabUI;
