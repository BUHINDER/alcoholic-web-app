import React from 'react';
import {useParams} from "react-router-dom";
import {Container} from "@mui/material";
import {useGetByInvitationLinkQuery} from "../../../store/api/EventApi";
import LoaderUI from "../../../component/ui/LoaderUI";
import {useAppSelector} from "../../../store/hook/Redux";
import InvitationCardUI from "../../../component/ui/event/invitation/InvitationCardUI";
import AlreadyParticipatingCardUI from "../../../component/ui/event/invitation/AlreadyParticipatingCardUI";

const EventInvitationPreviewPage = () => {
    const {id} = useParams();
    const {jwt} = useAppSelector(state => state.authReducer);
    const {data: event, isFetching: isEventFetching} = useGetByInvitationLinkQuery(id!!);

    if (isEventFetching || !event) {
        return <LoaderUI/>;
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "70%"}}>
            {event.participants.includes(jwt?.sub!!, 0)
                ? <AlreadyParticipatingCardUI event={event}/>
                : <InvitationCardUI id={id!!} event={event}/>
            }
        </Container>
    );
};

export default EventInvitationPreviewPage;
