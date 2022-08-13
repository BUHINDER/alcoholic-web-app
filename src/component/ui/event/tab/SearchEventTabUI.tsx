import React from 'react';
import {Grid} from "@mui/material";
import EventPreviewUI from "../EventPreviewUI";
import {useGetAllQuery} from "../../../../store/api/EventApi";
import LoaderUI from "../../LoaderUI";
import {TabPanel} from "@mui/lab";

const SearchEventTabUI = () => {
    const {data = [], isLoading} = useGetAllQuery();

    return (
        <TabPanel value={"1"}>
            {isLoading && <LoaderUI/>}
            {data.length == 0 &&
                <Grid container justifyContent={"center"}>
                    <h2>There are no events available</h2>
                </Grid>
            }
            <Grid container spacing={3}>
                {data.map(event => <EventPreviewUI key={event.id} event={event}/>)}
            </Grid>
        </TabPanel>
    );
};

export default SearchEventTabUI;