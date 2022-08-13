import React from 'react';
import {IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";

const PhotoButtonUI = ({...props}) => {
    return (
        <IconButton {...props} color="primary" component="label">
            <input hidden accept="image/*" type="file"/>
            <PhotoCamera/>
        </IconButton>
    );
};

export default PhotoButtonUI;
