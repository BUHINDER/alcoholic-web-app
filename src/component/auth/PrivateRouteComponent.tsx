import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useAppSelector} from "../../store/hook/Redux";
import {useRefreshMutation} from "../../store/api/AuthApi";
import {persist} from "../../store/reducer/AuthSlice";
import LoaderUI from "../ui/LoaderUI";
import {Navigate} from "react-router-dom";

interface IPrivateRouteComponent {
    children: ReactNode,
}

const PrivateRouteComponent: FC<IPrivateRouteComponent> = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {token} = useAppSelector(state => state.authReducer);
    const [refresh, {isLoading: isRefreshLoading}] = useRefreshMutation();
    const persistFlag = localStorage.getItem(persist);

    useEffect(() => {
        const refreshToken = async () => {
            return await refresh()
                .finally(() => setIsLoading(false));
        };

        !token && persistFlag ? refreshToken() : setIsLoading(false);
    }, []);

    if (isRefreshLoading || isLoading) {
        return <LoaderUI/>;
    }
    if (!token) {
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRouteComponent;
