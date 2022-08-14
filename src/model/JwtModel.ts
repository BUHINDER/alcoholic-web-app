export interface JwtModel {
    sub: string,
    session: string,
    roles: string[],
    exp: number,
    context: {
        displayName: string
    }
}
