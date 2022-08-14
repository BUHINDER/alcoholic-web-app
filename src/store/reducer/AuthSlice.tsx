import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccessTokenDto} from "../../dto/AccessTokenDto";
import {authApi} from "../api/AuthApi";
import {JwtModel} from "../../model/JwtModel";
import jwtDecode from "jwt-decode";

interface IAuth {
    token: string | null,
    context: JwtModel | null,
}

const AuthContextDefaults: IAuth = {
    token: null,
    context: null,
}

export const persist = "persist";

export const authSlice = createSlice({
    name: "auth",
    initialState: AuthContextDefaults,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action: PayloadAction<AccessTokenDto>) => {
                state.token = action.payload.accessToken;
                state.context = jwtDecode(state.token) as JwtModel;
                localStorage.setItem(persist, persist);
            }
        );
        builder.addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.token = null;
                localStorage.removeItem(persist)
            }
        );
        builder.addMatcher(
            authApi.endpoints.refresh.matchFulfilled,
            (state, action: PayloadAction<AccessTokenDto>) => {
                state.token = action.payload.accessToken;
                state.context = jwtDecode(state.token) as JwtModel;
            }
        );
    }
});

export default authSlice.reducer;
