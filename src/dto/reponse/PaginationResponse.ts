import {Pagination} from "../../model/Pagination";

export interface PaginationResponse<T> {
    data: T[],
    pagination: Pagination,
}