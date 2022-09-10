import React, {FC} from 'react';
import {TabPanel} from "@mui/lab";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";

//todo BUH-25 fetch all by id available
export interface IEventPageParticipantsTabUI {
    participants: string[],
}

const EventPageParticipantsTabUI: FC<IEventPageParticipantsTabUI> = ({participants}) => (
    <TabPanel value={"1"}>
        <TableContainer>
            <Table>
                <TableBody>
                    {participants.map(p => (
                        <TableRow key={p}>
                            <TableCell>{p}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </TabPanel>
);

export default EventPageParticipantsTabUI;
