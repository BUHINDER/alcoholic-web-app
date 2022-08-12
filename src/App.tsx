import React, {useEffect} from 'react';
import {useAppSelector} from "./store/hook/Redux";
import {useRefreshMutation} from "./store/api/AuthApi";
import {persist} from "./store/reducer/AuthSlice";
import {Route, Routes} from "react-router-dom";
import LayoutComponent from "./component/LayoutComponent";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import as from "./App.module.sass";
import LoaderUI from "./component/ui/LoaderUI";
import ProfilePage from "./page/ProfilePage";

function App() {
    const {token} = useAppSelector(state => state.authReducer);
    const [refresh, {isLoading}] = useRefreshMutation();
    const persistFlag = localStorage.getItem(persist)

    useEffect(() => {
        if (!token && persistFlag) {
            refresh();
        }
    }, []);

    return (
        <>
            {isLoading && <LoaderUI/>}
            {
                token
                    ? <div className={as.app}>
                        <Routes>
                            <Route element={<LayoutComponent/>}>
                                <Route index element={<HomePage/>}/>
                                <Route path={"/profile"} element={<ProfilePage/>}/>
                            </Route>
                            <Route path={"/login"} element={<LoginPage/>}/>
                            <Route path={"/register"} element={<RegisterPage/>}/>
                        </Routes>
                    </div>
                    : <LoginPage/>
            }
        </>
    );
}

export default App;
