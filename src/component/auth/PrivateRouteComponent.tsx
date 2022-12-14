import React, {FC, ReactNode} from 'react';
import {useAppSelector} from "../../store/hook/Redux";
import {Navigate} from "react-router-dom";

interface IPrivateRouteComponent {
    children: ReactNode,
}

const PrivateRouteComponent: FC<IPrivateRouteComponent> = ({children}) => {
    const {token} = useAppSelector(state => state.authReducer);

    if (!token) {
        return <Navigate to={"/login"} replace={true}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRouteComponent;
