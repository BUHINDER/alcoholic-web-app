import React, {FC, useEffect, useState} from 'react';
import {TabContext} from "@mui/lab";
import {Tab, Tabs} from "@mui/material";
import EventPageInfoTabUI from "./EventPageInfoTabUI";
import EventPageParticipantsTabUI from "./EventPageParticipantsTabUI";
import {SingleEventResponse} from "../../../../../dto/reponse/SingleEventResponse";
import {buildUserFullName} from "../../../../../util/UserUtil";
import {useLazyGetUserByIdQuery} from "../../../../../store/api/UserApi";

export interface IEventPageMainTab {
    singleEvent: SingleEventResponse,
    isOwner: boolean,
}

const EventPageMainTab: FC<IEventPageMainTab> = ({singleEvent, isOwner}) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [owner, setOwner] = useState<string>("");
    const [getUserById] = useLazyGetUserByIdQuery();

    useEffect(() => {
        getUserById(singleEvent.event.createdBy).unwrap().then(res => setOwner(buildUserFullName(res)));
    }, [singleEvent.event]);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    return (
        <TabContext value={`${tabValue}`}>
            <Tabs value={tabValue} onChange={handleChange}>
                <Tab label="Info"/>
                <Tab label="Participants"/>
            </Tabs>
            <EventPageInfoTabUI title={singleEvent.event.title}
                                info={singleEvent.event.info}
                                location={singleEvent.event.location}
                                owner={isOwner ? `${owner} (You)` : owner}
                                startDate={singleEvent.event.startDate}
                                endDate={singleEvent.event.endDate}
            />
            <EventPageParticipantsTabUI participants={singleEvent.participants}/>
        </TabContext>
    );
};

export default EventPageMainTab;
