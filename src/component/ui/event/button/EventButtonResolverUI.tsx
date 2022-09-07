import React, {FC} from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {useDisbandEventMutation, useJoinEventMutation, useLeaveEventMutation} from "../../../../store/api/EventApi";

export interface IEventButtonUI {
    eventId: string,
    isOwner: boolean,
    isParticipant: boolean,
}

const EventButtonResolverUI: FC<IEventButtonUI> = ({eventId, isOwner, isParticipant}) => {
    const [joinEvent] = useJoinEventMutation();
    const [leaveEvent] = useLeaveEventMutation();
    const [disband] = useDisbandEventMutation();

    function onJoin() {
        joinEvent(eventId);
    }

    function onLeave() {
        leaveEvent(eventId);
    }

    function onDisband() {
        disband(eventId);
    }

    return (
        <ButtonGroup variant={"outlined"} fullWidth>
            {!isOwner && !isParticipant && <Button onClick={onJoin}>Join</Button>}
            {isOwner && <Button onClick={onDisband} color={"error"}>Disband </Button>}
            {!isOwner && isParticipant && <Button onClick={onLeave} color={"error"}>Leave</Button>}
        </ButtonGroup>
    );
};

export default EventButtonResolverUI;
