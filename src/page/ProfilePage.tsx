import React from 'react';
import {Card, CardMedia, Container, Grid} from "@mui/material";
import ProfileMainTabUI from "../component/ui/profile/tab/ProfileMainTabUI";

const ProfilePage = () => {
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
                <Grid item md={3}>
                    <Card sx={{height: "inherit", width: "100%",}}>
                        <CardMedia
                            component="img"
                            image={require("../image/stokovyi-chel.jpg")}
                            alt={"Profile"}
                            sx={{objectFit: "cover"}}
                        />
                    </Card>
                </Grid>
                <Grid item md={9}>
                    <ProfileMainTabUI/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
