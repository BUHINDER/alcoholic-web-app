import React from 'react';
import {Alert} from "@mui/material";

const ErrorAlertUI = () => {
    return (
        <Alert sx={{position: "absolute", display: "flex", width: "100%"}} severity={"error"}>
            Error creating event!
        </Alert>
    );
};

export default ErrorAlertUI;
