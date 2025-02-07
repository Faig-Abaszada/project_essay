import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Define which columns should be sticky
const stickyColumns = ["id", "name"];

// Function to get sticky header styles
const getStickyHeaderStyles = () => ({
    backgroundColor: "#000", // Black header
    color: "#fff", // White text
    position: "sticky",
    top: 0,
    zIndex: 1600
});

// Function to get sticky column styles
const getStickyColumnStyles = (columnKey, index, isHeader = false) => {
    if (!stickyColumns.includes(columnKey)) return {}; // Return empty if not sticky

    return {
        backgroundColor: isHeader ? "#000" : "#fff", // Header = black, body = white
        color: isHeader ? "#fff" : "inherit",
        position: "sticky",
        left: `${index * 50}px`, // Adjust column width
        zIndex: isHeader ? 1700 : 1500 // Ensure header is above sticky columns
    };
};

// Column definitions
const columns = [
    { front_end_key: "id", name: "ID", format: (value) => value + "55" },
    { front_end_key: "name", name: "Name", format: (value) => value },
    { front_end_key: "created_at", name: "Date Created", format: (value) => value },
    { front_end_key: "role", name: "Role", format: (value) => value },
    { front_end_key: "status", name: "Status", format: (value) => <span>{value}</span> },
    { front_end_key: "action", name: "Action", format: () => null }
];

// Sample data
const rows = [
    { id: 1, name: "Faik Abaszada", created_at: "2021-10-10", role: "Admin", status: "Active" },
    { id: 2, name: "John Doe", created_at: "2021-10-11", role: "User", status: "Active" },
    { id: 3, name: "Jane Smith", created_at: "2021-10-12", role: "User", status: "Suspended" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
    { id: 4, name: "Alice Johnson", created_at: "2021-10-13", role: "Admin", status: "Inactive" },
];

// Main Table Component
export default function BasicTable() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div className="report-page">
            <div className="table-toolbar">
                <Button variant="contained">Create new user</Button>
                <Button variant="outlined" startIcon={<ContentCopyIcon />}>Duplicate</Button>
                <Button variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                <Button variant="outlined" startIcon={<FileDownloadIcon />}>Export</Button>
            </div>

            <TableContainer component={Paper} className="table-container" sx={{ maxHeight: 400 }}>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                    {/* Table Head with Sticky Header */}
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.front_end_key}
                                    sx={{
                                        ...getStickyHeaderStyles(),
                                        ...getStickyColumnStyles(column.front_end_key, index, true)
                                    }}
                                >
                                    {column.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.front_end_key}
                                        sx={getStickyColumnStyles(column.front_end_key, index)}
                                    >
                                        {column.front_end_key === "action" ? (
                                            <IconButton><MoreHorizIcon /></IconButton>
                                        ) : column.format ? column.format(row[column.front_end_key]) : row[column.front_end_key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div className="pagination">
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </div>
    );
}
