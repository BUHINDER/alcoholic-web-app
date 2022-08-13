import React from 'react';
import {Container} from "@mui/material";
import EventMainTabUI from "../component/ui/event/tab/EventMainTabUI";

const EventsPage = () => {
    return (
        <Container sx={{display: "flex", flexDirection: "column", flex: "1 1 auto"}}>
            <EventMainTabUI/>
        </Container>
    );
};

export default EventsPage;
