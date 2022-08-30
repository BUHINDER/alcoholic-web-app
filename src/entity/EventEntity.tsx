import {EventType} from "../dto/EventType";

export interface EventEntity {
    title: string,
    info: string,
    type: EventType.PUBLIC,
    location: string,
    startDate: number | null,
    endDate: number | null,
    alcoholicsIds: string[],
    photosIds: string[],
}
