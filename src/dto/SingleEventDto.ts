import {EventDto} from "./EventDto";

export interface SingleEventDto {
    event: EventDto,
    images: string[],
    participants: string[],
}
