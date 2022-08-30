import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import AccountInfoTabUI from "./AccountInfoTabUI";
import EventsTabUI from "./EventsTabUI";
import {TabContext} from "@mui/lab";

const ProfileMainTabUI = () => {
    const [tabValue, setTabValue] = useState<number>(1);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    return (
        <TabContext value={`${tabValue}`}>
            <Tabs value={tabValue} onChange={handleChange} variant={"fullWidth"}>
                <Tab label="ACCOUNT INFORMATION"/>
                <Tab label="MY EVENTS"/>
            </Tabs>
            <AccountInfoTabUI/>
            <EventsTabUI/>
        </TabContext>
    );
};

export default ProfileMainTabUI;
