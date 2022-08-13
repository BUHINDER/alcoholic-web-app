import {TabPanel} from "@mui/lab";
import {Box, Button} from "@mui/material";
import ProfileFieldUI from "./ProfileFieldUI";
import React, {FormEvent, useState} from "react";
import PhotoButtonUI from "../../util/PhotoButtonUI";

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
                <PhotoButtonUI/>
            </Box>
            {!isEditing &&
                <Button variant={"contained"} onClick={() => setIsEditing(true)}>Edit</Button>}
            {isEditing && <Button variant={"contained"} onClick={() => setIsEditing(false)}>Save</Button>}
        </TabPanel>
    );
};

export default AccountInfoTabUI;
