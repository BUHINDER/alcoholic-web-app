import React, {FC, useState} from 'react';
import {Box, TextField} from "@mui/material";

export interface IProfileFieldUI {
    fieldLabel: string,
    isEnabled: boolean,
}

const ProfileFieldUI: FC<IProfileFieldUI> = ({fieldLabel, isEnabled}) => {
    const [value, setValue] = useState<string>("");

    return (
        <Box sx={{mt: 1, mb: 1,}}>
            <TextField
                label={fieldLabel}
                value={value}
                onChange={e => setValue(e.target.value)}
                fullWidth
                disabled={!isEnabled}
                size={"small"}
                variant={"standard"}
            />
        </Box>
    );
};

export default ProfileFieldUI;
