import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {FullEventDto} from "../../dto/FullEventDto";
import {EventDto} from "../../dto/EventDto";

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
        getAllEvents: build.query<FullEventDto[], void>({
            query: () => ({
                url: ""
            }),
            providesTags: () => ["EVENT"]
        }),
        getEvent: build.query<FullEventDto, string>({
            query: (id: string) => ({
                url: `/${id}`
            })
        }),
        getAllOwnEvents: build.query<EventDto[], void>({
            query: () => ({
                url: "/own"
            }),
            providesTags: () => ["OWN_EVENTS"]
        }),
        postEvent: build.mutation<void, FormData>({
            query: (formData: FormData) => ({
                url: "",
                method: "POST",
                body: formData
            }),
            invalidatesTags: () => ["EVENT"]
        })
    })
});

export const {useGetAllEventsQuery, usePostEventMutation, useLazyGetAllOwnEventsQuery, useLazyGetEventQuery} = eventApi;
