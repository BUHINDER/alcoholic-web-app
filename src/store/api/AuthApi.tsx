import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenDto} from "../../dto/AccessTokenDto";
import {RootState} from "../Store";
import {UserCredentialsEntity} from "../../entity/UserCredentialsEntity";
import {UserEntity} from "../../entity/UserEntity";
import {UserDto} from "../../dto/UserDto";

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8081/api",
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ["Auth"],
    endpoints: (build) => ({
        register: build.mutation<UserDto, FormData>({
            query: (formData: FormData) => ({
                url: "/register",
                method: "POST",
                body: formData
            })
        }),
        login: build.mutation<AccessTokenDto, UserCredentialsEntity>({
            query: (credentials: UserCredentialsEntity) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        }),
        refresh: build.mutation<AccessTokenDto, void>({
            query: () => ({
                url: "/refresh",
                method: "POST"
            })
        }),
    })
});

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useRefreshMutation} = authApi;
