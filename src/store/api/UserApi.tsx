import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {UserResponse} from "../../dto/reponse/UserResponse";

export const userApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8081/api/alcoholic/alcoholic",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ["USER"],
    endpoints: (build) => ({
        getUserByEmail: build.query<UserResponse, string>({
            query: (email: string) => ({
                url: `/${email}`,
            }),
            providesTags: () => ["USER"]
        }),
        getOwnInfo: build.query<UserResponse, void>({
            query: () => ({
                url: "/own",
            }),
            providesTags: () => ["USER"]
        })
    })
});

export const {useLazyGetUserByEmailQuery, useLazyGetOwnInfoQuery} = userApi;
