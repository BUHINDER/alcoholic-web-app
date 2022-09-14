import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, Tooltip} from "@mui/material";
import Styles from "./Styles";

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
                     placement={"right"}
                     disableFocusListener
                     disableHoverListener
                     disableTouchListener
                     title={title}
                     arrow
                     open
                     componentsProps={{tooltip: {sx: Styles.tooltip}}}
            >
                {children}
            </Tooltip>
        </ClickAwayListener>
    );
};

export default ToolTipUI;