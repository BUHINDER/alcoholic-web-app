import React, {useEffect, useState} from 'react';
import {TabPanel} from "@mui/lab";
import {Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {epochToDate} from "../../../../util/DateUtil";
import {useLazyGetAllOwnEventsQuery} from "../../../../store/api/EventApi";
import LoaderUI from "../../LoaderUI";
import {PaginationParamModel} from "../../../../model/PaginationParamModel";
import PaginationUI from "../../util/pagination/PaginationUI";

const EventsTabUI = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [getAllOwnEvents, {data: ownEventsPageable}] = useLazyGetAllOwnEventsQuery();
    const [paginationParam, setPaginationParam] = useState<PaginationParamModel>({page: 0, pageSize: 10});

    useEffect(() => {
        getAllOwnEvents(paginationParam)
            .finally(() => setIsLoading(false));
    }, [paginationParam]);

    if (isLoading || !ownEventsPageable) {
        return <LoaderUI/>;
    }

    return (
        <TabPanel value={"1"}>
            <TableContainer>
                <Table sx={{minWidth: "100%"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell style={{width: 200}} align="center">Start Date</TableCell>
                            <TableCell style={{width: 200}} align="center">End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ownEventsPageable.data.map(event =>
                            <TableRow key={event.id}
                                      sx={{cursor: "pointer", ":hover": {background: "rgba(0,53,255,0.05)"}}}
                                      onClick={() => navigate(`/event/${event.id}`)}>
                                <TableCell component="th" scope="row">
                                    {event.title}
                                </TableCell>
                                <TableCell style={{width: 200}} align="center">
                                    {epochToDate(event.startDate)}
                                </TableCell>
                                <TableCell style={{width: 200}} align="center">
                                    {epochToDate(event.endDate)}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {ownEventsPageable.pagination.total > paginationParam.pageSize &&
                                <PaginationUI setPaginationParam={setPaginationParam}
                                              pagination={ownEventsPageable.pagination}
                                />
                            }
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

export default EventsTabUI;
