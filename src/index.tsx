import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {setupStore} from "./store/Store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);