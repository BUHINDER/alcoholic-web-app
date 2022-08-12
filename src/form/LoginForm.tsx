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
    Link,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const LoginForm = () => {
    const [user, setUser] = useState<UserCredentialsEntity>({login: "", password: ""});
    const [login, {isLoading}] = useLoginMutation();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function handleLoginOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, login: e.target.value});
    }

    function handlePasswordOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, password: e.target.value});
    }

    const handleOnClick = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        return login(user);
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
                        variant={"outlined"}
                        margin={"normal"}
                        required
                        fullWidth
                        autoFocus
                        type={"text"}
                        value={user.login}
                        onChange={handleLoginOnChange}
                    />
                    <OutlinedInput
                        placeholder={"Password"}
                        fullWidth
                        disabled={user.login.length <= 0 || isLoading}
                        type={isVisible ? 'text' : 'password'}
                        value={user.password}
                        onChange={handlePasswordOnChange}
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
                        Log In
                    </LoadingButton>
                </Box>
                <Grid container sx={{display: "flex", flexDirection: "column"}}>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginForm;
