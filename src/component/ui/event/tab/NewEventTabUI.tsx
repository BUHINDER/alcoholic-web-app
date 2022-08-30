import React, {FC, FormEvent, ReactNode, useState} from 'react';
import {TabPanel} from "@mui/lab";
import {Box, Button, Grid, ImageList, ImageListItem, TextField, Typography} from "@mui/material";
import {EventEntity} from "../../../../entity/EventEntity";
import {EventType} from "../../../../dto/EventType";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {usePostEventMutation} from "../../../../store/api/EventApi";
import PhotoButtonUI from "../../util/PhotoButtonUI";
import ErrorAlertUI from "../../util/ErrorAlertUI";
import SuccessAlertUI from "../../util/SuccessAlertUI";

const initialState: EventEntity = {
    title: "",
    info: "",
    type: EventType.PUBLIC,
    location: "",
    startDate: null,
    endDate: null,
    alcoholicsIds: [],
    photosIds: [],
}

const NewEventTabUI = () => {
    const formData = new FormData();
    const [blobs, setBlobs] = useState<Blob[]>([]);
    const [eventEntity, setEventEntity] = useState<EventEntity>(initialState);
    const [saveEvent, {isSuccess, isError}] = usePostEventMutation();

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        formData.append("event", new Blob([JSON.stringify(eventEntity)], {type: 'application/json'}));
        blobs.map(blob => formData.append("images", blob));
        saveEvent(formData)
            .then(() => {
                if (isSuccess) {
                    setEventEntity(initialState);
                    setBlobs([]);
                }
            });
    }

    function handleImageOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const item = files[i];
                setBlobs(oldBlobs => [...oldBlobs, new Blob([item], {type: item.type})]);
            }
        }
    }

    return (
        <TabPanel value={"0"}
                  sx={{display: "flex", flexDirection: "column", flex: "1 0 auto", position: "relative", padding: 0}}>
            {isSuccess && <SuccessAlertUI/>}
            {isError && <ErrorAlertUI/>}
            <form onSubmit={e => handleOnSubmit(e)}>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <EventFromContainer>
                            <Typography variant={"h6"}>Select Event Dates</Typography>
                            <Box sx={{display: "flex", flexDirection: "row", gap: "7%", width: "100%"}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="From"
                                        value={eventEntity.startDate}
                                        onChange={e => setEventEntity({...eventEntity, startDate: e!!.valueOf()})}
                                        disablePast
                                    />
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="To"
                                        value={eventEntity.endDate}
                                        onChange={e => setEventEntity({...eventEntity, endDate: e!!.valueOf()})}
                                        disablePast
                                    />
                                </LocalizationProvider>
                            </Box>
                        </EventFromContainer>
                        <EventFromContainer>
                            <Typography variant={"h6"}>Fill In Event Information</Typography>
                            <TextField
                                label={"Title"}
                                value={eventEntity.title}
                                onChange={e => setEventEntity({...eventEntity, title: e.target.value})}
                                size={"small"}
                                fullWidth
                                variant={"standard"}
                                required
                            />
                            <TextField
                                label={"Information"}
                                value={eventEntity.info}
                                onChange={e => setEventEntity({...eventEntity, info: e.target.value})}
                                size={"small"}
                                fullWidth
                                variant={"standard"}
                                required
                            />
                            <TextField
                                label={"Location"}
                                value={eventEntity.location}
                                onChange={e => setEventEntity({...eventEntity, location: e.target.value})}
                                size={"small"}
                                fullWidth
                                variant={"standard"}
                                required
                            />
                        </EventFromContainer>
                    </Grid>
                    <Grid item md={6}>
                        <EventFromContainer>
                            <Typography variant={"h6"}>Attach Photos</Typography>
                        </EventFromContainer>
                        <PhotoButtonUI onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageOnChange(e)}/>
                        {blobs.length}
                        <ImageList sx={{width: "100%", mb: 1}} cols={7}>
                            {blobs.map(blob =>
                                <ImageListItem onClick={() => setBlobs(blobs.filter(b => b != blob))}>
                                    <Box component={"img"}
                                         sx={{width: "100%", height: 64, objectFit: "cover"}}
                                         src={URL.createObjectURL(blob)}
                                    />
                                </ImageListItem>)}
                        </ImageList>
                    </Grid>
                </Grid>
                <Grid item md={12} sx={{display: "flex"}}>
                    <Box sx={{flexGrow: 1}}/>
                    <Button variant={"contained"} type={"submit"}>Save</Button>
                </Grid>
            </form>
        </TabPanel>
    );
}

export default NewEventTabUI;

interface IEventFromContainer {
    children: ReactNode,
}

const EventFromContainer: FC<IEventFromContainer> = ({children}) => {
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            mb: 3
        }}>
            {children}
        </Box>
    );
}
