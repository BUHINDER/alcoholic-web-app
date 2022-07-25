import React, {useEffect} from 'react';
import './App.css';
import {useAppSelector} from "./store/hook/Redux";
import {useLogoutMutation, useRefreshMutation} from "./store/api/AuthApi";
import {persist} from "./store/reducer/AuthSlice";
import LoginPage from "./page/LoginPage";
import {Route, Routes} from "react-router-dom";
import LayoutComponent from "./component/LayoutComponent";
import RegisterPage from "./page/RegisterPage";

function App() {
    const {token} = useAppSelector(state => state.authReducer);
    const [refresh] = useRefreshMutation();
    const [logout] = useLogoutMutation();
    const persistFlag = localStorage.getItem(persist)

    useEffect(() => {
        if (!token && persistFlag) {
            refresh();
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route element={<LayoutComponent/>}>
                    <Route index element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
