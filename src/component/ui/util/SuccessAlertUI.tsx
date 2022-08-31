import React, {FC} from 'react';
import {Alert} from "@mui/material";

export interface ISuccessAlertUI {
    message: string
}

const SuccessAlertUI: FC<ISuccessAlertUI> = ({message}) => {
    return (
        <Alert sx={{position: "absolute", display: "flex", width: "100%"}} severity={"success"}>
            {message}
        </Alert>
    );
};

export default SuccessAlertUI;
