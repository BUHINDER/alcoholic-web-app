import {TabPanel} from "@mui/lab";
import {Box, TextField} from "@mui/material";
import React, {FC} from "react";
import {UserResponse} from "../../../../dto/reponse/UserResponse";

interface IAccountInfoTabUI {
    user: UserResponse,
}

const AccountInfoTabUI: FC<IAccountInfoTabUI> = ({user}) => {
    return (
        <TabPanel value={"0"}>
            <Box component={"form"}>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"First Name"}
                        value={user.firstname}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Last Name"}
                        value={user.lastName}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Age"}
                        value={user.age}
                        disabled
                        fullWidth
                        size={"small"}
                        variant={"standard"}
                    />
                </Box>
                <Box sx={{mt: 1, mb: 1,}}>
                    <TextField
                        label={"Email"}
                        value={user.email}
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
