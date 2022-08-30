import {EventDto} from "./EventDto";

export interface FullEventDto {
    event: EventDto,
    images: string[],
    participants: string[],
}
