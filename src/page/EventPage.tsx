import React from 'react';
import {useParams} from "react-router-dom";
import {useGetEventQuery} from "../store/api/EventApi";
import {Card, CardMedia, Container, Grid} from "@mui/material";
import LoaderUI from "../component/ui/LoaderUI";
import {useAppSelector} from "../store/hook/Redux";
import EventButtonResolverUI from "../component/ui/event/button/EventButtonResolverUI";
import EventPageMainTab from "../component/ui/event/single/tab/EventPageMainTab";

const EventPage = () => {
    const {id} = useParams();
    const {jwt} = useAppSelector(state => state.authReducer);
    const {data: singleEvent} = useGetEventQuery(id!!);

    if (!singleEvent) {
        return (
            <LoaderUI/>
        );
    }

    return (
        <Container>
            <Grid container spacing={3}
                  sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mb: 2,
                  }}
            >
                <Grid item md={4} sm={6} xs={6}>
                    <Card sx={{height: "30rem", width: "20rem"}}>
                        <CardMedia component="img"
                                   image={
                                       singleEvent.images.length > 0
                                           ? `http://localhost:8082/api/alcoparty/image/${singleEvent.images[0]}`
                                           : require("../image/1.jpg")
                                   }
                                   alt={singleEvent.event.title}
                                   sx={{objectFit: "cover", height: "inherit", width: "inherit"}}
                        />
                    </Card>
                </Grid>
                <Grid item md={8} sm={6} xs={6}>
                    <EventPageMainTab singleEvent={singleEvent}
                                      isOwner={singleEvent?.event.createdBy === jwt?.sub!!}/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <EventButtonResolverUI
                        eventId={singleEvent.event.id}
                        isOwner={singleEvent?.event.createdBy === jwt?.sub!!}
                        isParticipant={singleEvent.participants.includes(jwt?.sub!!, 0)}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EventPage;
