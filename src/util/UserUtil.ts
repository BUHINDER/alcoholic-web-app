import {UserResponse} from "../dto/reponse/UserResponse";

export function buildUserFullName(user: UserResponse) {
    return `${user.firstname} ${user.lastName}`
}
