import React from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRouteComponent from "./component/auth/PrivateRouteComponent";
import LayoutComponent from "./component/LayoutComponent";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import as from "./App.module.sass";
import ProfilePage from "./page/ProfilePage";
import EventsPage from "./page/EventsPage";
import PublicRouteComponent from "./component/auth/PublicRouteComponent";
import PersistAuthComponent from "./component/auth/PersistAuthComponent";
import EventPage from "./page/EventPage";
import NotFoundPage from "./page/NotFoundPage";

function App() {
    return (
        <div className={as.app}>
            <PersistAuthComponent>
                <Routes>
                    <Route element={
                        <PrivateRouteComponent>
                            <LayoutComponent/>
                        </PrivateRouteComponent>}
                    >
                        <Route index element={<EventsPage/>}/>
                        <Route path={"/profile"} element={<ProfilePage/>}/>
                        <Route path={"/event/:id"} element={<EventPage/>}/>
                        <Route path={"/*"} element={<NotFoundPage/>}/>
                    </Route
                    >
                    <Route path={"/login"} element={<PublicRouteComponent><LoginPage/></PublicRouteComponent>}/>
                    <Route path={"/register"} element={<PublicRouteComponent><RegisterPage/></PublicRouteComponent>}/>
                    <Route path={"/*"} element={<NotFoundPage/>}/>
                </Routes>
            </PersistAuthComponent>
        </div>
    );
}

export default App;
