import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccessTokenDto} from "../../dto/AccessTokenDto";
import {authApi} from "../api/AuthApi";

interface IAuth {
    token: string | null
}

const AuthContextDefaults: IAuth = {
    token: null
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
                localStorage.setItem(persist, persist)
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
            }
        );
    }
});

export default authSlice.reducer;
