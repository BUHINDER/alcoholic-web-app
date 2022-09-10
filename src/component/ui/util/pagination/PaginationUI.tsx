import React, {Dispatch, FC, SetStateAction} from 'react';
import {PaginationParamModel} from "../../../../model/PaginationParamModel";
import {Pagination} from "../../../../model/Pagination";
import {TablePagination} from "@mui/material";

interface IPaginationUI {
    setPaginationParam: Dispatch<SetStateAction<PaginationParamModel>>,
    pagination: Pagination,
}

const PaginationUI: FC<IPaginationUI> = ({setPaginationParam, pagination}) => {

    function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) {
        setPaginationParam(prev => ({...prev, page: newPage}));
    }

    function handleRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) {
        setPaginationParam(prev => ({...prev, pageSize: parseInt(event.target.value, 10)}));
        setPaginationParam(prev => ({...prev, page: 0}));
    }

    return (
        <TablePagination count={pagination.total}
                         page={pagination.page}
                         rowsPerPage={pagination.pageSize}
                         onPageChange={handlePageChange}
                         onRowsPerPageChange={handleRowsPerPageChange}
        />
    );
};

export default PaginationUI;