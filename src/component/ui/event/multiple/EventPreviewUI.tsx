import React, {FC} from 'react';
import {Button, ButtonGroup, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {FullEventDto} from "../../../../dto/FullEventDto";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../store/hook/Redux";
import {useJoinEventMutation} from "../../../../store/api/EventApi";

interface IEventPreview {
    fullEvent: FullEventDto,
}

const EventPreviewUI: FC<IEventPreview> = ({fullEvent}) => {
    const [joinEvent] = useJoinEventMutation();
    const {jwt} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();
    const event = fullEvent.event;

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
                maxHeight: "30rem",
                minHeight: "30rem",
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
                <ButtonGroup variant={"text"} fullWidth>
                    <Button onClick={() => navigate(`/events/${event.id}`)} variant={"outlined"}>View</Button>
                    {jwt?.sub !== event.createdBy
                        && !fullEvent.participants.includes(jwt?.sub!!, 0)
                        && <Button onClick={() => joinEvent(event.id)}
                                   variant={"contained"}
                        >
                            Join
                        </Button>
                    }
                </ButtonGroup>
            </Card>
        </Grid>
    );
};

export default EventPreviewUI;