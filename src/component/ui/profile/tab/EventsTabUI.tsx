import React from 'react';
import {TabPanel} from "@mui/lab";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {EventDto} from "../../../../dto/EventDto";
import {useGetAllOwnEventsQuery} from "../../../../store/api/EventApi";
import {epochToDate} from "../../../../util/DateUtil";

const EventsTabUI = () => {
    const {data = []} = useGetAllOwnEventsQuery();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    const paginationProps = buildPaginationProps(data.length, rowsPerPage, page);

    const [filter, setFilter] = React.useState({
        completed: false,
        active: false,
        scheduled: false,
        owner: false,
        participant: false,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter({...filter, [event.target.name]: event.target.checked});
    }

    return (
        <TabPanel value={"1"}>
            <Accordion>
                <AccordionSummary>Filters</AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                checked={filter.completed}
                                control={<Checkbox onChange={handleChange}/>}
                                label={"Completed"}
                                name={"completed"}
                            />
                            <FormControlLabel
                                checked={filter.active}
                                control={<Checkbox onChange={handleChange}/>}
                                label={"Active"}
                                name={"active"}
                            />
                            <FormControlLabel
                                checked={filter.scheduled}
                                control={<Checkbox onChange={handleChange}/>}
                                label={"Scheduled"}
                                name={"scheduled"}
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                checked={filter.owner}
                                control={<Checkbox onChange={handleChange}/>}
                                label={"Owner"}
                                name={"owner"}
                            />
                            <FormControlLabel
                                checked={filter.participant}
                                control={<Checkbox onChange={handleChange}/>}
                                label={"Participant"}
                                name={"participant"}
                            />
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
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
                        {paginateEventList(data).map(row => mapEventRowsCell(row))}
                        {emptyRows > 0 && fillEmptyRowsCells()}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination {...paginationProps}/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );

    function mapEventRowsCell(event: EventDto) {
        return (
            <TableRow key={event.id}>
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
        )
    }

    function paginateEventList(events: EventDto[]) {
        return rowsPerPage > 0
            ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : events;
    }

    function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function fillEmptyRowsCells() {
        return (
            <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6}/>
            </TableRow>
        );
    }

    function buildPaginationProps(dataLength: number, rowsPerPage: number, page: number) {
        return {
            rowsPerPageOptions: [5, 10, 25, {label: "All", value: -1}],
            colSpan: 3,
            count: dataLength,
            rowsPerPage: rowsPerPage,
            page: page,
            SelectProps: {
                inputProps: {
                    "aria-label": "rows per page",
                },
                native: true,
            },
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleChangeRowsPerPage,
            ActionsComponent: TablePaginationActions
        }
    }
};

export default EventsTabUI;
