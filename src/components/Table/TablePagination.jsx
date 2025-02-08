import "../../assets/styles/components/tablePagination.scss";
import React from "react";
import Pagination from "@mui/material/Pagination";

export default function TablePagination({count, page, onChange}) {
    return (
        <div className="pagination">
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                color="primary"
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
}
