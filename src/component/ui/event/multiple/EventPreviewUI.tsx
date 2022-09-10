import React, {FC} from 'react';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {MultipleEventDto} from "../../../../dto/MultipleEventDto";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../store/hook/Redux";
import EventButtonResolverUI from "../button/EventButtonResolverUI";

interface IEventPreview {
    fullEvent: MultipleEventDto,
}

const EventPreviewUI: FC<IEventPreview> = ({fullEvent}) => {
    const {jwt} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();
    const event = fullEvent.event;

    function handleNavigateToEventCard() {
        navigate(`/event/${event.id}`);
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box sx={{
                cursor: "pointer",
                "&:hover": {
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.10))",
                }
            }}>
                <Card onClick={handleNavigateToEventCard}
                      sx={{
                          maxHeight: "27rem",
                          minHeight: "27rem",
                          display: "flex",
                          flexDirection: "column",
                      }}>
                    <CardMedia component="img"
                               image={
                                   fullEvent.images.length > 0
                                       ? `http://localhost:8082/api/alcoparty/image/${fullEvent.images[0]}`
                                       : require("../../../../image/1.jpg")
                               }
                               alt={event.title}
                               sx={{objectFit: "cover", maxHeight: "15rem", minHeight: "15rem", width: "100%"}}
                    />
                    <CardContent sx={{flexGrow: 1}}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {event.title.length > 30 ? event.title.substring(0, 30).concat("...") : event.title}
                        </Typography>
                        <Typography>
                            {event.info.length > 60 ? event.info.substring(0, 60).concat("...") : event.info}
                        </Typography>
                    </CardContent>
                </Card>
                <EventButtonResolverUI eventId={event.id}
                                       isOwner={jwt?.sub === event.createdBy}
                                       isParticipant={fullEvent.isParticipant}
                                       fullWidth
                />
            </Box>
        </Grid>
    );
};

export default EventPreviewUI;
