import React from 'react';
import {Box, Link, Typography} from "@mui/material";

const FooterUI = () => {
    return (
        <Box sx={{bgcolor: "background.paper", p: 1, mt: 1}} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Buhinder
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Find your Alcolove
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="https://buhinder.com/">
                    Buhinder.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
};

export default FooterUI;
