import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {useRegisterMutation} from "../store/api/AuthApi";
import {UserEntity} from "../entity/UserEntity";
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
import {LoadingButton} from "@mui/lab";
import {Link} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const initialState = {
    firstname: "",
    lastName: "",
    age: undefined,
    email: "",
    login: "",
    password: "",
}

const RegisterForm = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [user, setUser] = useState<UserEntity>(initialState);
    const [register, {isLoading, isSuccess}] = useRegisterMutation();

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        return setUser({...user, [e.target.name]: e.target.value});
    }

    function handleOnClick(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        register(user)
            .then(() => {
                if (isSuccess) {
                    setUser(initialState)
                }
            });
    }

    return (
        <>
            <Container maxWidth={"xs"}>
                <CssBaseline/>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Avatar sx={{m: 1, bgcolor: "76ff03"}}>
                        <AppRegistrationIcon/>
                    </Avatar>
                    <Typography component={"h1"} variant={"h5"}>
                        Sign Up
                    </Typography>
                    <Box>
                        <TextField type={"text"}
                                   placeholder={"First Name"}
                                   label={"First Name"}
                                   name={"firstname"}
                                   required
                                   onChange={handleOnChange}
                                   value={user.firstname}
                                   autoFocus
                                   variant={"outlined"}
                                   margin={"normal"}
                                   fullWidth
                        />
                        <TextField type={"text"}
                                   placeholder={"Last Name"}
                                   label={"Last Name"}
                                   name={"lastName"}
                                   required
                                   onChange={handleOnChange}
                                   value={user.lastName}
                                   autoFocus
                                   variant={"outlined"}
                                   margin={"normal"}
                                   fullWidth
                        />
                        <TextField type={"number"}
                                   placeholder={"Age"}
                                   label={"Age"}
                                   name={"age"}
                                   onChange={handleOnChange}
                                   value={user.age}
                                   autoFocus
                                   variant={"outlined"}
                                   margin={"normal"}
                                   fullWidth
                        />
                        <TextField type={"email"}
                                   placeholder={"Email"}
                                   label={"Email"}
                                   name={"email"}
                                   required
                                   onChange={handleOnChange}
                                   value={user.email}
                                   autoFocus
                                   variant={"outlined"}
                                   margin={"normal"}
                                   fullWidth
                        />
                        <TextField type={"text"}
                                   placeholder={"Login"}
                                   label={"Login"}
                                   name={"login"}
                                   required
                                   onChange={handleOnChange}
                                   value={user.login}
                                   autoFocus
                                   variant={"outlined"}
                                   margin={"normal"}
                                   fullWidth
                        />
                        <OutlinedInput
                            sx={{mt: 2}}
                            name={"password"}
                            placeholder={"Password"}
                            fullWidth
                            type={isVisible ? 'text' : 'password'}
                            value={user.password}
                            onChange={handleOnChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        disabled={isLoading}
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
                            onClick={handleOnClick}
                            loading={isLoading}
                            type={"submit"}
                            fullWidth
                            variant={"contained"}
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </LoadingButton>
                    </Box>
                    <Grid container sx={{display: "flex", flexDirection: "column"}}>
                        <Grid item xs>
                            <Link to={"/restore"}>
                                {"Forgot password?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={"/login"}>
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default RegisterForm;
