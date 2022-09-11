import React, {FC} from 'react';
import InvitationHeaderUI from "./InvitationHeaderUI";
import {useNavigate} from "react-router-dom";
import {useJoinEventByLinkMutation} from "../../../../store/api/InvitationLinkApi";
import {SingleEventResponse} from "../../../../dto/reponse/SingleEventResponse";
import EventInfoCardUI from "./EventInfoCardUI";

interface IInvitationCardUI {
    id: string,
    event: SingleEventResponse,
}

const InvitationCardUI: FC<IInvitationCardUI> = ({id, event}) => {
    const navigate = useNavigate();
    const [joinEventByLink] = useJoinEventByLinkMutation();

    function handleJoinOnClick() {
        joinEventByLink(id!!).unwrap()
            .then(res => {
                if (res.id) {
                    navigate(`/event/${res.id}`);
                }
            });
    }

    return (
        <>
            <InvitationHeaderUI createdBy={event.event.createdBy}/>
            <EventInfoCardUI event={event} buttonText={"Join"} onClick={handleJoinOnClick}/>
        </>
    );
};

export default InvitationCardUI;