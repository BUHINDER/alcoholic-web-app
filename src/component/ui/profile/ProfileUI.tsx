import React from "react";
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {useLogoutMutation} from "../../../store/api/AuthApi";
import {Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../store/hook/Redux";

const ProfileUI = () => {
    const {context} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <>
            <Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
                <Typography sx={{color: "black"}}>{context?.context.displayName}</Typography>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar sx={{width: 32, height: 32}} src={require("../../../image/stokovyi-chel.jpg")}/>
                </IconButton>
            </Box>
            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: "15%",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <MenuItem onClick={() => navigate("/profile")}>
                    <Avatar/> Profile
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileUI;
