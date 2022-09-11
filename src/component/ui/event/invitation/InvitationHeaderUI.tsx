import React, {FC, useEffect} from 'react';
import {useLazyGetUserByIdQuery} from "../../../../store/api/UserApi";
import LoaderUI from "../../LoaderUI";
import {Typography} from "@mui/material";
import {buildUserFullName} from "../../../../util/UserUtil";

interface IInvitationHeaderUI {
    createdBy: string,
}

const InvitationHeaderUI: FC<IInvitationHeaderUI> = ({createdBy}) => {
    const [getUserById, {data: user, isFetching: isUserFetching}] = useLazyGetUserByIdQuery();

    useEffect(() => {
        getUserById(createdBy);
    }, []);

    if (isUserFetching || !user) {
        return <LoaderUI/>;
    }

    return (
        <>
            <Typography variant={"h4"}>Congratulations!</Typography>
            <Typography variant={"h6"}>
                You have been invited to the {buildUserFullName(user)}'s event.
            </Typography>
        </>
    );
};

export default InvitationHeaderUI;
