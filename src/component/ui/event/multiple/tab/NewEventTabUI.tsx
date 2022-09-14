import React, {FC, ReactNode, useState} from 'react';
import {TabPanel} from "@mui/lab";
import {Box, Button, Grid, ImageList, ImageListItem, OutlinedInput, Stack, TextField, Typography} from "@mui/material";
import {EventType} from "../../../../../dto/EventType";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {usePostEventMutation} from "../../../../../store/api/EventApi";
import PhotoButtonUI from "../../../util/PhotoButtonUI";
import ErrorAlertUI from "../../../util/ErrorAlertUI";
import SuccessAlertUI from "../../../util/SuccessAlertUI";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ToolTipUI from "../../../util/tooltip/ToolTipUI";
import {EventEntity} from "../../../../../entity/EventEntity";

type Inputs = {
    title: string,
    info: string,
    type: EventType,
    location: string,
    startDate: Date,
    endDate: Date,
    alcoholicsIds: string[],
}

const schema = yup.object({
    title: yup.string()
        .required("Title is required")
        .max(50, "Title must be less than or equal to 50")
        .trim(),
    info: yup.string()
        .required("Information is required")
        .max(1000, "Information must be less than or equal to 1000")
        .trim(),
    location: yup.string()
        .required("Location is required")
        .max(200, "Location must be less than or equal to 200")
        .trim(),
    startDate: yup.date()
        .required("Date is required")
        .min(new Date(), "Event Start Date must be after current date and time")
        .max(
            yup.ref("endDate"),
            "Event Start Date must be before Event End Date"
        ),
    endDate: yup.date()
        .required("Date is required")
        .min(
            yup.ref("startDate"),
            "Event End Date must be after Event Start Date"
        ),
});

const NewEventTabUI = () => {
    const navigate = useNavigate();
    const formData = new FormData();
    const [blobs, setBlobs] = useState<Blob[]>([]);
    const [saveEvent, {isSuccess, isError}] = usePostEventMutation();
    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    //todo rafactor datepickers validation when smarter
    function onSubmit({alcoholicsIds, endDate, info, location, startDate, title, type}: Inputs) {
        const event = {
            title: title,
            info: info,
            type: type ? type : EventType.PUBLIC,
            location: location,
            startDate: startDate.valueOf(),
            endDate: endDate.valueOf(),
            alcoholicsIds: alcoholicsIds ? alcoholicsIds : [],
        } as EventEntity
        formData.append("event", new Blob([JSON.stringify(event)], {type: 'application/json'}));
        blobs.map(blob => formData.append("images", blob));
        saveEvent(formData)
            .then((res) => {
                //todo FT-37
                // @ts-ignore
                const response = res.data;
                if (response) {
                    setBlobs([]);
                    navigate(`/event/${response.id}`, {replace: true});
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
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 0 auto",
                      position: "relative",
                      padding: 0
                  }}>
            {isSuccess && <SuccessAlertUI message={"Event successfully created!"}/>}
            {isError && <ErrorAlertUI message={"Error creating event!"}/>}
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <EventFormContainer>
                            <Typography variant={"h6"}>Select Event Dates</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}>
                                    <Controller name={"startDate"}
                                                control={control}
                                                render={({field}) =>
                                                    <ToolTipUI title={(errors.startDate?.message || "")}
                                                               placement={"top"}
                                                    >
                                                        <TextField
                                                            label="Event Start Date"
                                                            type="datetime-local"
                                                            sx={{width: "47%"}}
                                                            InputLabelProps={{shrink: true}}
                                                            {...field}
                                                        />
                                                    </ToolTipUI>
                                                }
                                    />
                                    <Controller name={"endDate"}
                                                control={control}
                                                render={({field}) =>
                                                    <ToolTipUI title={(errors.endDate?.message || "")}
                                                               placement={"top"}
                                                    >
                                                        <TextField
                                                            label="Event End Date"
                                                            type="datetime-local"
                                                            sx={{width: "47%"}}
                                                            InputLabelProps={{shrink: true}}
                                                            {...field}
                                                        />
                                                    </ToolTipUI>
                                                }
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </EventFormContainer>
                        <EventFormContainer>
                            <Typography variant={"h6"}>Fill In Event Information</Typography>
                            <Controller name={"title"}
                                        control={control}
                                        render={({field}) =>
                                            <ToolTipUI title={(errors.title?.message || "")}>
                                                <OutlinedInput type={"string"}
                                                               placeholder={"Title"}
                                                               fullWidth
                                                               {...field}
                                                />
                                            </ToolTipUI>
                                        }
                            />
                            <Controller name={"info"}
                                        control={control}
                                        render={({field}) =>
                                            <ToolTipUI title={(errors.info?.message || "")}>
                                                <OutlinedInput type={"string"}
                                                               placeholder={"Information"}
                                                               fullWidth
                                                               {...field}
                                                />
                                            </ToolTipUI>
                                        }
                            />
                            <Controller name={"location"}
                                        control={control}
                                        render={({field}) =>
                                            <ToolTipUI title={(errors.location?.message || "")}>
                                                <OutlinedInput type={"string"}
                                                               placeholder={"Location"}
                                                               fullWidth
                                                               {...field}
                                                />
                                            </ToolTipUI>
                                        }
                            />
                        </EventFormContainer>
                    </Grid>
                    <Grid item md={6}>
                        <EventFormContainer>
                            <Typography variant={"h6"}>Attach Photos</Typography>
                        </EventFormContainer>
                        <PhotoButtonUI
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageOnChange(e)}/>
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
            </Box>
        </TabPanel>
    );
}

export default NewEventTabUI;

interface IEventFromContainer {
    children: ReactNode,
}

const EventFormContainer: FC<IEventFromContainer> = ({children}) => {
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
