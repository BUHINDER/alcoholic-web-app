import Any = jasmine.Any;

export interface ErrorDto {
    code: string,
    message: string,
    payload: Map<string, Any>
}
