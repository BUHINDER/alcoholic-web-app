import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {TabContext} from "@mui/lab";
import {useNavigate} from "react-router-dom";

const HeaderButtonsUI = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const navigate = useNavigate();

    function handleClick(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>, to: string) {
        e.preventDefault();
        navigate(to);
    }

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    return (
        <TabContext value={`${tabValue}`}>
            <Tabs value={tabValue} onChange={handleChange} variant={"fullWidth"}>
                <Tab label={"Home"}
                     component={"a"}
                     sx={{color: "black"}}
                     onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) =>
                         handleClick(e, "/")
                     }
                />
                <Tab label={"Events"}
                     component={"a"}
                     sx={{color: "black"}}
                     onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) =>
                         handleClick(e, "/events")
                     }
                />
            </Tabs>
        </TabContext>
    );
};

export default HeaderButtonsUI;
