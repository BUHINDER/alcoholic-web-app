import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import {TabContext} from "@mui/lab";
import {useNavigate} from "react-router-dom";

const HeaderButtonsUI = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState<number>(0);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    function handleClick(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>, to: string) {
        e.preventDefault();
        navigate(to);
    }

    return (
        <TabContext value={`${tabValue}`}>
            <Tabs value={tabValue} onChange={handleChange} variant={"fullWidth"}>
                {/*Extract tab element*/}
                <Tab component={"a"} label="TEST"
                     onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) =>
                         handleClick(e, "/")
                     }
                />
                <Tab component={"a"} label="TEST"
                     onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) =>
                         handleClick(e, "/")
                     }
                />
                <Tab component={"a"} label="TEST"
                     onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>) =>
                         handleClick(e, "/")
                     }
                />
            </Tabs>
        </TabContext>
    );
};

export default HeaderButtonsUI;
