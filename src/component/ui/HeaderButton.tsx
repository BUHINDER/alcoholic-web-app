import React, {FC} from 'react';
import {Button} from "@mui/material";

export interface IHeaderButton {
    content: string
}

const HeaderButton: FC<IHeaderButton> = ({content}) => {
    return (
        <Button variant={"text"} sx={{color: "black"}}>{content}</Button>
    );
};

export default HeaderButton;
