import React, {useEffect} from 'react';
import {TabPanel} from "@mui/lab";
import {
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
import {epochToDate} from "../../../../util/DateUtil";
import {useLazyGetAllOwnEventsQuery} from "../../../../store/api/EventApi";
import {useNavigate} from "react-router-dom";

const EventsTabUI = () => {
    const navigate = useNavigate();
    const [trigger, {data = []}] = useLazyGetAllOwnEventsQuery();
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

    useEffect(() => {
        trigger();
    }, [])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFilter({...filter, [event.target.name]: event.target.checked});
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
            <TableRow key={event.id}
                      sx={{cursor: "pointer", ":hover": {background: "rgba(0,53,255,0.05)"}}}
                      onClick={() => navigate(`/events/${event.id}`)}>
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
