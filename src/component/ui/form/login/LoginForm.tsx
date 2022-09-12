import React, {useState} from 'react';
import {useLoginMutation} from "../../../../store/api/AuthApi";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
    Avatar,
    Box,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {UserCredentialsEntity} from "../../../../entity/UserCredentialsEntity";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import ToolTipUI from "../../util/ToolTipUI";

type Inputs = {
    login: string,
    password: string,
};

const schema = yup.object({
    login: yup.string().required(),
    password: yup.string().required(),
});

const LoginForm = () => {
    const [loginUser, {isLoading}] = useLoginMutation();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver: yupResolver(schema)});

    const onSubmit: SubmitHandler<Inputs> = ({login, password}: Inputs) => {
        loginUser({login: login, password: password} as UserCredentialsEntity)
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
                <Typography component={"h1"}
                            variant={"h5"}>
                    Sign in
                </Typography>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={"login"}
                        control={control}
                        defaultValue={""}
                        render={({field}) =>
                            <ToolTipUI title={(errors.login?.message || "")}>
                                <OutlinedInput sx={{color: "black", m: "0.3rem"}}
                                               placeholder={"Login"}
                                               id={"login"}
                                               fullWidth
                                               autoFocus
                                               type={"text"}
                                               {...field}
                                />
                            </ToolTipUI>
                        }
                    />
                    <Controller
                        name={"password"}
                        control={control}
                        defaultValue={""}
                        render={({field}) =>
                            <ToolTipUI title={(errors.password?.message || "")}>
                                <OutlinedInput sx={{color: "black", m: "0.3rem"}}
                                               placeholder={"Password"}
                                               fullWidth
                                               type={isVisible ? 'text' : 'password'}
                                               endAdornment={
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           onClick={() => setIsVisible(!isVisible)}
                                                           onMouseDown={e => e.preventDefault()}
                                                           edge={"end"}
                                                       >
                                                           {isVisible ? <VisibilityOff/> : <Visibility/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               }
                                               {...field}
                                />
                            </ToolTipUI>}
                    />
                    <LoadingButton loading={isLoading}
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