import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {EventDto} from "../../dto/EventDto";
import {EventEntity} from "../../entity/EventEntity";

export const eventApi = createApi({
    reducerPath: "event",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8082/api/alcoparty/event",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ["EVENT", "OWN_EVENTS"],
    endpoints: (build) => ({
        getAllEvents: build.query<EventDto[], void>({
            query: () => ({
                url: ""
            }),
            providesTags: () => ["EVENT"]
        }),
        getAllOwnEvents: build.query<EventDto[], void>({
            query: () => ({
                url: "/own"
            }),
            providesTags: () => ["OWN_EVENTS"]
        }),
        postEvent: build.mutation<void, EventEntity>({
            query: (event: EventEntity) => ({
                url: "",
                method: "POST",
                body: event
            }),
            invalidatesTags: () => ["EVENT"]
        })
    })
});

export const {useGetAllEventsQuery, usePostEventMutation, useGetAllOwnEventsQuery} = eventApi;
