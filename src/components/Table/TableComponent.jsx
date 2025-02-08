import "../../assets/styles/components/tableComponent.scss";
import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHeader from "./TableHeader.jsx";
import TableBodyComponent from "./TableBody.jsx";
import {columns} from "../../constants/columns.jsx";
import TableSkeleton from "./TableSkeleton.jsx";

export default function TableComponent({rows, loading = true, paginatedRows, openDeleteModal}) {
    return (
        <div className="table-wrapper">
            {loading &&
                <TableSkeleton loading={loading} rowsPerPage={10} columns={columns.length}/>}
            {!loading &&
                <TableContainer component={Paper} sx={{maxHeight: "75vh"}} className="table-container">
                    <Table stickyHeader sx={{minWidth: 650}}>
                        <TableHeader columns={columns}/>
                        <TableBodyComponent rows={paginatedRows} openDeleteModal={openDeleteModal}/>
                    </Table>
                </TableContainer>
            }
        </div>

    );
}
