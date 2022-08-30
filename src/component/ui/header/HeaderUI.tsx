import React from 'react';
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import ProfileUI from "../profile/ProfileUI";
import HeaderButtonsUI from "./HeaderButtonsUI";
import {useNavigate} from "react-router-dom";

const HeaderUI = () => {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Container sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Typography variant="h6"
                                color="black"
                                onClick={() => navigate("/")}
                                sx={{cursor: "pointer"}}
                    >
                        Buhinder
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <HeaderButtonsUI/>
                    <Box sx={{flexGrow: 1}}/>
                    <ProfileUI/>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderUI;
