import React from 'react';
import {TabPanel} from "@mui/lab";
import {IStep} from "../../../../model/IStep";

const steps: IStep[] = [
    {id: 0, step: "Select Event Dates", isOptional: false},
    {id: 1, step: "Fill In Information", isOptional: false},
    {id: 2, step: "Invite People", isOptional: true},
    {id: 3, step: "Attach Photos", isOptional: true},
    {id: 4, step: "Create", isOptional: false},
]

const NewEventTabUI = () => {
    return (
        <TabPanel value={"0"} sx={{display: "flex", flexDirection: "column", flex: "1 0 auto"}}>

        </TabPanel>
    );
}

export default NewEventTabUI;