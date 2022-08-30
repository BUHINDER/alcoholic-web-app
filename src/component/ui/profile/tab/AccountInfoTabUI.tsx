import {TabPanel} from "@mui/lab";
import {Box, TextField} from "@mui/material";
import React, {FormEvent, useEffect, useState} from "react";
import {useLazyGetOwnInfoQuery} from "../../../../store/api/UserApi";
import {UserResponse} from "../../../../dto/reponse/UserResponse";

const AccountInfoTabUI = () => {
    const [getOwnInfo] = useLazyGetOwnInfoQuery();
    const [user, setUser] = useState<UserResponse>();

    useEffect(() => {
        getOwnInfo().unwrap().then(res => setUser(res));
    }, []);

    function handleSubmit(e: FormEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    return (
        <TabPanel value={"0"}>
            <Box component={"form"} onSubmit={(e: FormEvent<HTMLDivElement>) => handleSubmit(e)}>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"First Name"}
                        id={"firstname"}
                        value={user?.firstname}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Last Name"}
                        id={"lastName"}
                        value={user?.lastName}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Age"}
                        id={"age"}
                        value={user?.age}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Email"}
                        id={"email"}
                        value={user?.email}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
            </Box>
        </TabPanel>
    );
};

export default AccountInfoTabUI;
