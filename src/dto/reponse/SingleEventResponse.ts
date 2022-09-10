import {EventResponse} from "./EventResponse";

export interface SingleEventResponse {
    event: EventResponse,
    images: string[],
    participants: string[],
}
