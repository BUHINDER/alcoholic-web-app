import React from 'react';
import {useGetAllQuery} from "../store/api/EventApi";
import {Container, Grid} from "@mui/material";
import EventPreviewUI from "../component/ui/EventPreviewUI";
import LoaderUI from "../component/ui/LoaderUI";

const HomePage = () => {
    const {data = [], isLoading} = useGetAllQuery();
    return (
        <Container>
            {isLoading && <LoaderUI/>}
            {data.length == 0 &&
                <Grid container justifyContent={"center"}>
                    <h2>There are no events available</h2>
                </Grid>
            }
            <Grid container spacing={3}>
                {data.map(event => <EventPreviewUI key={event.id} event={event}/>)}
            </Grid>
        </Container>
    );
};

export default HomePage;
