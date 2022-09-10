import {EventType} from "../EventType";
import {EventStatus} from "../EventStatus";

export interface EventResponse {
    id: string,
    title: string,
    info: string,
    type: EventType,
    location: string,
    status: EventStatus,
    startDate: number,
    endDate: number,
    createdBy: string,
}
