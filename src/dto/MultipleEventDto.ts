import {EventDto} from "./EventDto";

export interface MultipleEventDto {
    event: EventDto,
    images: string[],
    isParticipant: boolean,
}
