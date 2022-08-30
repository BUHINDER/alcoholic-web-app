import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useLazyGetEventQuery} from "../store/api/EventApi";
import {EventDto} from "../dto/EventDto";
import {
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    Grid,
    Tab,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import {useLazyGetUserByIdQuery} from "../store/api/UserApi";
import {buildUserFullName} from "../util/UserUtil";
import LoaderUI from "../component/ui/LoaderUI";
import {TabContext, TabPanel} from "@mui/lab";
import {epochToDate} from "../util/DateUtil";
import {useAppSelector} from "../store/hook/Redux";
import {UserResponse} from "../dto/reponse/UserResponse";

interface IField {
    name: string,
    value: string,
}

const Field: FC<IField> = ({name, value}) => {
    return (
        <dl style={{display: "flex", width: "100%", marginTop: "1rem"}}>
            <dt style={{width: "50%"}}>
                <span>{name}</span>
            </dt>
            <dd>{value}</dd>
        </dl>
    );
}

//todo MUST be refactored
const EventPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {id} = useParams();
    const {jwt} = useAppSelector(state => state.authReducer);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [event, setEvent] = useState<EventDto>();
    const [images, setImages] = useState<string[]>([]);
    const [owner, setOwner] = useState<string>("");
    const [participants, setParticipants] = useState<UserResponse[]>([]);
    const [getUserById, {isLoading: isUserLoading}] = useLazyGetUserByIdQuery();
    const [getEventTrigger, {isLoading: isEventLoading}] = useLazyGetEventQuery();
    const [tabValue, setTabValue] = useState<number>(0);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    useEffect(() => {
        getEventTrigger(id!!).unwrap()
            .then(res => {
                setEvent(res.event);
                setImages(res.images);
                res.participants
                    .map(p => getUserById(p).unwrap()
                        .then(p => setParticipants(prev => [...prev, p])));
                getUserById(res.event.createdBy).unwrap().then(user => setOwner(buildUserFullName(user)));
                setIsOwner(jwt?.sub === res.event.createdBy!!);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading || isUserLoading || isEventLoading) {
        return (
            <LoaderUI/>
        );
    }

    return (
        <Container>
            <Grid container spacing={3}
                  sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mb: 2,
                  }}
            >
                <Grid item md={4}>
                    <Card sx={{height: "30rem", width: "20rem"}}>
                        <CardMedia component="img"
                                   image={
                                       images?.length!! > 0
                                           ? `http://localhost:8082/api/alcoparty/image/${images?.[0]}`
                                           : require("../image/1.jpg")
                                   }
                                   alt={event?.title}
                                   sx={{objectFit: "cover", height: "inherit", width: "inherit"}}
                        />
                    </Card>
                </Grid>
                <Grid item md={8}>
                    <TabContext value={`${tabValue}`}>
                        <Tabs value={tabValue} onChange={handleChange}>
                            <Tab label="Info"/>
                            <Tab label="Participants"/>
                        </Tabs>
                        <TabPanel value={"0"}>
                            <Typography variant={"h4"}>{event?.title}</Typography>
                            <Box sx={{mt: 2}}>
                                <Typography>{event?.info}</Typography>
                            </Box>
                            <Box sx={{mt: 2}}>
                                <Field name={"Location"} value={event?.location!!}/>
                                <Field name={"Owner"} value={isOwner ? `${owner} (You)` : owner}/>
                                <Field name={"Start Date"} value={epochToDate(event?.startDate!!)}/>
                                <Field name={"End Date"} value={epochToDate(event?.endDate!!)}/>
                            </Box>
                        </TabPanel>
                        <TabPanel value={"1"}>
                            <TableContainer>
                                <TableBody>
                                    {participants.map(p => (
                                        <TableRow>
                                            <TableCell>{buildUserFullName(p)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </TableContainer>
                        </TabPanel>
                    </TabContext>
                </Grid>
                <Grid item md={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                    {!isOwner && <Button variant={"contained"}>Join</Button>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default EventPage;
