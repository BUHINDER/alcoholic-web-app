import React, {FC, ReactNode} from 'react';
import {useAppSelector} from "../../store/hook/Redux";
import {Navigate} from "react-router-dom";

interface PublicRouteComponent {
    children: ReactNode,
}

const PublicRouteComponent: FC<PublicRouteComponent> = ({children}) => {
    const {token} = useAppSelector(state => state.authReducer);

    if (token) {
        return <Navigate to={"/"} replace={true}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export default PublicRouteComponent;
