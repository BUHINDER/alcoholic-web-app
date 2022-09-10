import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {MultipleEventDto} from "../../dto/MultipleEventDto";
import {EventDto} from "../../dto/EventDto";
import {SingleEventDto} from "../../dto/SingleEventDto";
import {IdResponse} from "../../dto/reponse/IdResponse";

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
    tagTypes: ["EVENTS", "OWN_EVENTS", "SINGLE_EVENT"],
    endpoints: (build) => ({
        getAllEvents: build.query<MultipleEventDto[], void>({
            query: () => ({
                url: ""
            }),
            providesTags: ["EVENTS"],
        }),
        getEvent: build.query<SingleEventDto, string>({
            query: (id: string) => ({
                url: `/${id}`
            }),
            providesTags: ["SINGLE_EVENT"],
        }),
        getAllOwnEvents: build.query<EventDto[], void>({
            query: () => ({
                url: "/own"
            }),
            providesTags: () => ["OWN_EVENTS"],
        }),
        postEvent: build.mutation<IdResponse, FormData>({
            query: (formData: FormData) => ({
                url: "",
                method: "POST",
                body: formData
            }),
            invalidatesTags: () => ["EVENTS"],
        }),
        joinEvent: build.mutation<IdResponse, string>({
            query: (eventId: string) => ({
                url: `/join/${eventId}`,
                method: "PUT",
            }),
            invalidatesTags: () => ["EVENTS", "SINGLE_EVENT"],
        }),
        leaveEvent: build.mutation<void, string>({
            query: (eventId: string) => ({
                url: `/leave/${eventId}`,
                method: "PUT",
            }),
            invalidatesTags: () => ["EVENTS", "SINGLE_EVENT"],
        }),
        disbandEvent: build.mutation<void, string>({
            query: (eventId: string) => ({
                url: `/disband/${eventId}`,
                method: "PUT",
            }),
            invalidatesTags: () => ["EVENTS", "SINGLE_EVENT"],
        }),
    })
});

export const {
    useGetAllEventsQuery,
    usePostEventMutation,
    useLazyGetAllOwnEventsQuery,
    useLazyGetEventQuery,
    useGetEventQuery,
    useJoinEventMutation,
    useLeaveEventMutation,
    useDisbandEventMutation,
} = eventApi;
