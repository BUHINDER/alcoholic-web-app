import React, {ChangeEvent, useState} from 'react';
import {useLoginMutation} from "../store/api/AuthApi";
import {UserCredentialsEntity} from "../entity/UserCredentialsEntity";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {LoadingButton} from '@mui/lab';

import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [user, setUser] = useState<UserCredentialsEntity>({login: "", password: ""});
    const [login, {isLoading}] = useLoginMutation();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, [e.target.id]: e.target.value});
    }

    const handleOnClick = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        login(user)
            .then(res => {
                //todo FT-37
                // @ts-ignore
                if (res.data) {
                    navigate("/", {replace: true})
                }
            });
    };

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline/>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Avatar sx={{m: 1, bgcolor: "76ff03"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component={"h1"} variant={"h5"}>
                    Sign in
                </Typography>
                <Box component={"form"} onSubmit={(e: React.FormEvent<HTMLDivElement>) => handleOnClick(e)}>
                    <TextField
                        disabled={isLoading}
                        placeholder={"Login"}
                        id={"login"}
                        variant={"outlined"}
                        margin={"normal"}
                        required
                        fullWidth
                        autoFocus
                        type={"text"}
                        value={user.login}
                        onChange={handleOnChange}
                    />
                    <OutlinedInput
                        sx={{color: "black"}}
                        placeholder={"Password"}
                        id={"password"}
                        fullWidth
                        disabled={user.login.length <= 0 || isLoading}
                        type={isVisible ? 'text' : 'password'}
                        value={user.password}
                        onChange={handleOnChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    disabled={user.login.length <= 0 || isLoading}
                                    aria-label={"toggle password visibility"}
                                    onClick={() => setIsVisible(!isVisible)}
                                    onMouseDown={e => e.preventDefault()}
                                    edge={"end"}
                                >
                                    {isVisible ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <LoadingButton
                        loading={isLoading}
                        disabled={user.login.length <= 0 || user.password.length <= 0}
                        type={"submit"}
                        fullWidth
                        variant={"contained"}
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </LoadingButton>
                </Box>
                <Grid container sx={{display: "flex", flexDirection: "column"}}>
                    <Grid item>
                        <Link to={"/register"}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginForm;
