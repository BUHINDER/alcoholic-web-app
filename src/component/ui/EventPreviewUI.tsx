import React, {FC} from 'react';
import {EventDto} from "../../dto/EventDto";
import {Button, ButtonGroup, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {EventType} from "../../dto/EventType";

interface IEventPreview {
    event: EventDto,
}

const EventPreviewUI: FC<IEventPreview> = ({event}) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{maxHeight: "30rem", minHeight: "30rem", display: "flex", flexDirection: "column"}}>
                <CardMedia component="img"
                           image={require("../../image/1.jpg")}
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
                    <Button>View</Button>
                    <Button variant={"contained"}>{event.type == EventType.APPROVE ? "Request" : "Join"}</Button>
                </ButtonGroup>
            </Card>
        </Grid>
    );
};

export default EventPreviewUI;
