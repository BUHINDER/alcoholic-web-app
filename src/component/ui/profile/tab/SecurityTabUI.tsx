import React from 'react';
import {TabPanel} from "@mui/lab";
import {Box, Button, TextField, Typography} from "@mui/material";

const SecurityTabUI = () => {
    return (
        <TabPanel value={"2"}>
            <Typography variant={"body1"}>CHANGE PASSWORD</Typography>
            <Box component={"form"}>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Current Password"}
                        value={""}
                        onChange={e => {
                        }}
                        fullWidth
                        disabled={false}
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"New Password"}
                        value={""}
                        onChange={e => {
                        }}
                        fullWidth
                        disabled={false}
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Confirm Password"}
                        value={""}
                        onChange={e => {
                        }}
                        fullWidth
                        disabled={false}
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
            </Box>
            <Button variant={"contained"}>Save</Button>
        </TabPanel>
    );
};

export default SecurityTabUI;
