import {EventResponse} from "./EventResponse";

export interface MultipleEventResponse {
    event: EventResponse,
    image?: string,
    isParticipant: boolean,
}
