import React from 'react';
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
import {useGetAllQuery} from "../../../../store/api/EventApi";
import {epochToDate} from "../../../../util/DateUtil";

const EventsTabUI = () => {
    const {data = [], isLoading} = useGetAllQuery(); //todo should be fetching own events
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //todo extract pagination to a service

    //todo add checkbox filtering for events
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
                        {(rowsPerPage > 0
                                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : data
                        ).map((row: EventDto) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell style={{width: 200}} align="center">
                                    {epochToDate(row.startDate)}
                                </TableCell>
                                <TableCell style={{width: 200}} align="center">
                                    {epochToDate(row.endDate)}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </TabPanel>
    );
};

export default EventsTabUI;
