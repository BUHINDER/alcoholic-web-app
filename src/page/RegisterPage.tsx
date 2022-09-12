import React from 'react';
import {Container} from "@mui/material";
import RegisterForm from "../component/ui/form/register/RegisterForm";

const RegisterPage = () => {
    return (
        <Container sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <RegisterForm/>
        </Container>
    );
}

export default RegisterPage;
