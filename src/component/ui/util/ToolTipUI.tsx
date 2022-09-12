import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, Tooltip} from "@mui/material";

interface IToolTipUI {
    children: ReactElement,
    title: string,
}

const ToolTipUI: FC<IToolTipUI> = ({children, title}) => {
    const [open, setOpen] = useState(false);

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip PopperProps={{disablePortal: true}}
                     onClose={() => setOpen(false)}
                     open={true}
                     placement={"right"}
                     disableFocusListener
                     disableHoverListener
                     disableTouchListener
                     title={title}
            >
                {children}
            </Tooltip>
        </ClickAwayListener>
    );
};

export default ToolTipUI;