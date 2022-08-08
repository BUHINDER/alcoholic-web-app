import React from 'react';
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import ProfileUI from "./ProfileUI";
import HeaderButton from "./HeaderButton";

const HeaderUI = () => {
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
                    alignItems: "baseline"
                }}>
                    <Typography variant="h6" color="black">
                        Buhinder
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Box>
                        <HeaderButton content={"Button1"}/>
                        <HeaderButton content={"Button2"}/>
                        <HeaderButton content={"Button3"}/>
                    </Box>
                    <Box sx={{flexGrow: 1}}/>
                    <ProfileUI/>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderUI;
