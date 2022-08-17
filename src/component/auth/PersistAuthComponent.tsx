import React, {FC, ReactNode, useEffect, useState} from 'react';
import LoaderUI from "../ui/LoaderUI";
import {useRefreshMutation} from "../../store/api/AuthApi";
import {persist} from "../../store/reducer/AuthSlice";
import {useAppSelector} from "../../store/hook/Redux";

interface IPersistAuthComponent {
    children: ReactNode,
}

const PersistAuthComponent: FC<IPersistAuthComponent> = ({children}) => {
    const {token} = useAppSelector(state => state.authReducer);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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

    return (
        <>
            {children}
        </>
    );
};

export default PersistAuthComponent;
