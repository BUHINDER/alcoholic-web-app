import React from "react"
import {Outlet} from "react-router-dom";
import HeaderUI from "./ui/header/HeaderUI";
import {Container} from "@mui/material";

const LayoutComponent = () => {
    return (
        <>
            <HeaderUI/>
            <Container sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                flex: "1 0 auto",
                padding: "1.5rem",
            }}>
                <Outlet/>
            </Container>
        </>
    )
}

export default LayoutComponent;
