import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import EventPreviewUI from "../preview/EventPreviewUI";
import {TabPanel} from "@mui/lab";
import {useLazyGetAllEventsQuery} from "../../../../../store/api/EventApi";
import {PaginationParamModel} from "../../../../../model/PaginationParamModel";
import LoaderUI from "../../../LoaderUI";
import PaginationUI from "../../../util/pagination/PaginationUI";

const SearchEventTabUI = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [getAllEvents, {data: eventsPageable}] = useLazyGetAllEventsQuery();
    const [paginationParam, setPaginationParam] = useState<PaginationParamModel>({page: 0, pageSize: 10});

    useEffect(() => {
        getAllEvents(paginationParam)
            .finally(() => setIsLoading(false));
    }, [paginationParam]);

    if (isLoading || !eventsPageable) {
        return <LoaderUI/>;
    }

    return (
        <TabPanel value={"1"}>
            {eventsPageable.pagination.total === 0 &&
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <h2>There are no events available</h2>
                </Box>
            }
            <Grid container spacing={3}>
                {eventsPageable.data.map(event =>
                    <EventPreviewUI key={event.event.id}
                                    multipleEventResponse={event}/>)}
                {eventsPageable.pagination.total > paginationParam.pageSize &&
                    <Grid item xs={12} sm={12} md={12}
                          sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <PaginationUI setPaginationParam={setPaginationParam} pagination={eventsPageable.pagination}/>
                    </Grid>
                }
            </Grid>
        </TabPanel>
    );
};

export default SearchEventTabUI;