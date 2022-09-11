import React, {FC} from 'react';
import {Typography} from "@mui/material";
import {SingleEventResponse} from "../../../../dto/reponse/SingleEventResponse";
import {useNavigate} from "react-router-dom";
import EventInfoCardUI from "./EventInfoCardUI";

interface IAlreadyParticipatingCardUI {
    event: SingleEventResponse,
}

const AlreadyParticipatingCardUI: FC<IAlreadyParticipatingCardUI> = ({event}) => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant={"h6"}>
                Oops. You are already participating in the event!
            </Typography>
            <EventInfoCardUI event={event}
                             buttonText={"Go to event"}
                             onClick={() => navigate(`/event/${event.event.id}`)}
            />
        </>
    );
};

export default AlreadyParticipatingCardUI;