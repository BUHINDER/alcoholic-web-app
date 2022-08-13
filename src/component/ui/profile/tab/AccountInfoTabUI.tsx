import {TabPanel} from "@mui/lab";
import {Box, Button, IconButton} from "@mui/material";
import ProfileFieldUI from "./ProfileFieldUI";
import React, {FormEvent, useState} from "react";
import {PhotoCamera} from "@mui/icons-material";

const AccountInfoTabUI = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    function handleSubmit(e: FormEvent<HTMLDivElement>) {
        e.preventDefault()
        return setIsEditing(false);
    }

    return (
        <TabPanel value={"0"}>
            <Box component={"form"} onSubmit={(e: FormEvent<HTMLDivElement>) => handleSubmit(e)}>
                <ProfileFieldUI fieldLabel={"First Name"} isEnabled={isEditing}/>
                <ProfileFieldUI fieldLabel={"Last Name"} isEnabled={isEditing}/>
                <ProfileFieldUI fieldLabel={"Age"} isEnabled={isEditing}/>
                <ProfileFieldUI fieldLabel={"Email"} isEnabled={isEditing}/>
                <IconButton color="primary" component="label">
                    <input hidden accept="image/*" type="file"/>
                    <PhotoCamera/>
                </IconButton>
            </Box>
            {!isEditing &&
                <Button variant={"contained"} onClick={() => setIsEditing(true)}>Edit</Button>}
            {isEditing && <Button variant={"contained"} onClick={() => setIsEditing(false)}>Save</Button>}
        </TabPanel>
    );
};

export default AccountInfoTabUI;
