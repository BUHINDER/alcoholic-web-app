import React, {MouseEvent} from 'react';
import LoginForm from "../form/LoginForm";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()

    function handleRegisterOnClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        navigate("/register");
    }

    return (
        <div>
            <LoginForm/>
            <div>
                <span>Need an account?</span>
                <button onClick={handleRegisterOnClick}>Register</button>
            </div>
        </div>
    );
};

export default LoginPage;
