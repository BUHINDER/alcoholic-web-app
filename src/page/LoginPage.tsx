import React from 'react';
import LoginForm from "../component/ui/form/login/LoginForm";
import {Container} from "@mui/material";

const LoginPage = () => {
    return (
        <Container sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <LoginForm/>
        </Container>
    );
};

export default LoginPage;
