import React, {FC} from 'react';
import {TabPanel} from "@mui/lab";
import {Box, Typography} from "@mui/material";
import {epochToRuDate} from "../../../../../util/DateUtil";

export interface IEventPageInfoTabUI {
    title: string,
    info: string,
    location: string,
    owner: string,
    startDate: number,
    endDate: number,
}

const EventPageInfoTabUI: FC<IEventPageInfoTabUI> = (props) => (
    <TabPanel value={"0"}>
        <Typography variant={"h4"}>{props.title}</Typography>
        <Box sx={{mt: 2}}>
            <Typography>{props.info}</Typography>
        </Box>
        <Box sx={{mt: 2}}>
            <Field name={"Location"} value={props.location}/>
            <Field name={"Owner"} value={props.owner}/>
            <Field name={"Start Date"} value={epochToRuDate(props.startDate)}/>
            <Field name={"End Date"} value={epochToRuDate(props.endDate)}/>
        </Box>
    </TabPanel>
);

export default EventPageInfoTabUI;

interface IField {
    name: string,
    value: string,
}

const Field: FC<IField> = (props) => (
    <dl style={{display: "flex", width: "100%", marginTop: "1rem"}}>
        <dt style={{width: "50%"}}>
            <span>{props.name}</span>
        </dt>
        <dd>{props.value}</dd>
    </dl>
)
