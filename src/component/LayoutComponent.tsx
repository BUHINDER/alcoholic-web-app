import React from "react"
import {Outlet} from "react-router-dom";
import FooterUI from "./ui/FooterUI";
import HeaderUI from "./ui/HeaderUI";
import {Container} from "@mui/material";

const LayoutComponent = () => {
    return (
        <>
            <HeaderUI/>
            <Container sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flex: "1 0 auto",
                paddingTop: "1.5rem"
            }}>
                <Outlet/>
            </Container>
            <FooterUI/>
        </>
    )
}

export default LayoutComponent;
