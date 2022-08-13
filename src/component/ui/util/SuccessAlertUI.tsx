import React from 'react';
import {Alert} from "@mui/material";

const SuccessAlertUI = () => {
    return (
        <Alert sx={{position: "absolute", display: "flex", width: "100%"}} severity={"success"}>
            Event successfully created!
        </Alert>
    );
};

export default SuccessAlertUI;
