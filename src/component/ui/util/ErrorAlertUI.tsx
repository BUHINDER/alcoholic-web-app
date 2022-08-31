import React, {FC} from 'react';
import {Alert} from "@mui/material";

export interface IErrorAlertUI {
    message: string
}

const ErrorAlertUI: FC<IErrorAlertUI> = ({message}) => {
    return (
        <Alert sx={{position: "absolute", display: "flex", width: "100%"}} severity={"error"}>
            {message && message}
        </Alert>
    );
};

export default ErrorAlertUI;
