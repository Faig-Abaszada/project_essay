import './assets/styles/components/tableToolbar.scss'

import * as React from 'react';

// MATERIAL COMPONENTS
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {useState, useEffect} from "react";
import Pagination from '@mui/material/Pagination';
import {Button, IconButton, TextField, MenuItem } from "@mui/material";

// CUSTOM COMPONENTS
import Modal from "./components/Modal.jsx";
import OverlayLoader from "./components/OverlayLoader.jsx";
import TableSkeleton from "./components/TableSkeleton.jsx";

// ICONS
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// CONSTANTS | THEY CAN BE MOVED TO A SEPARATE HELPER FILES
const status = {
    a: { label: 'Active', value: 'a', bg_color: 'green' },
    s: { label: 'Suspended', value: 's', bg_color: 'red'},
    i: { label: 'Inactive', value: 'i', bg_color: 'gray'},

    getByValue(value) {
        return this[value] ? this[value] : null;
    },
    // (status.getByValue('a')); // { label: 'Active', value: 'a', bg_color: 'green' }

    getByLabel(label) {
        const entry = Object.values(this).find(status => status.label === label);
        return entry ? entry : null;
    },
    // (status.getByLabel('Suspended')); // { label: 'Suspended', value: 's', bg_color: 'red'},

    list() {
        return Object.values(this);
    }
    // (status.list()); // [{ value: 'a', label: 'Active' }, { value: 's', label: 'Suspended' }, { value: 'i', label: 'Inactive' }]
};

const roles = ["Admin", "User"];
const rows_data = [
    { id: 1, name: 'Faik Abaszada', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-10', role: 'Admin', status: 'a', action: null },
    { id: 2, name: 'John Doe', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-11', role: 'User', status: 'a', action: null },
    { id: 3, name: 'Jane Smith', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-12', role: 'User', status: 'a', action: null },
    { id: 4, name: 'Alice Johnson', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-13', role: 'Admin', status: 'a', action: null },
    { id: 5, name: 'Bob Brown', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-14', role: 'User', status: 'a', action: null },
    { id: 6, name: 'Charlie Davis', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-15', role: 'User', status: 'a', action: null },
    { id: 7, name: 'Diana Evans', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-16', role: 'Admin', status: 'a', action: null },
    { id: 8, name: 'Eve Foster', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-17', role: 'User', status: 'a', action: null },
    { id: 9, name: 'Frank Green', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-18', role: 'User', status: 'a', action: null },
    { id: 10, name: 'Grace Harris', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-19', role: 'Admin', status: 'a', action: null },
    { id: 11, name: 'Sophia Lewis', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-20', role: 'User', status: 'a', action: null },
    { id: 12, name: 'Liam Clark', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-21', role: 'Admin', status: 'a', action: null },
    { id: 13, name: 'Isabella Martinez', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-22', role: 'User', status: 'a', action: null },
    { id: 14, name: 'Noah Walker', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-23', role: 'Admin', status: 'a', action: null },
    { id: 15, name: 'Olivia Harris', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-24', role: 'User', status: 'a', action: null },
    { id: 16, name: 'James Robinson', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-25', role: 'Admin', status: 'a', action: null },
    { id: 17, name: 'Amelia Carter', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-26', role: 'User', status: 'a', action: null },
    { id: 18, name: 'Benjamin Wilson', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-27', role: 'Admin', status: 'a', action: null },
    { id: 19, name: 'Lucas Anderson', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-28', role: 'User', status: 'a', action: null },
    { id: 20, name: 'Mia Thomas', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-29', role: 'Admin', status: 'a', action: null },
    { id: 21, name: 'Harper Moore', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-30', role: 'User', status: 'a', action: null },
    { id: 22, name: 'Elijah Lee', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-10-31', role: 'Admin', status: 'a', action: null },
    { id: 23, name: 'Zoe White', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-01', role: 'User', status: 'a', action: null },
    { id: 24, name: 'Ethan Young', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-02', role: 'Admin', status: 'a', action: null },
    { id: 25, name: 'Mason King', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-03', role: 'User', status: 'a', action: null },
    { id: 26, name: 'Ava Scott', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-04', role: 'Admin', status: 'a', action: null },
    { id: 27, name: 'Alexander Adams', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-05', role: 'User', status: 'a', action: null },
    { id: 28, name: 'Charlotte Turner', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-06', role: 'Admin', status: 'a', action: null },
    { id: 29, name: 'Henry Perez', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-07', role: 'User', status: 'a', action: null },
    { id: 30, name: 'Amos Green', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-08', role: 'Admin', status: 'a', action: null },
    { id: 31, name: 'Ella Hall', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-09', role: 'User', status: 'a', action: null },
    { id: 32, name: 'Wyatt Allen', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-10', role: 'Admin', status: 'a', action: null },
    { id: 33, name: 'Mila Harris', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-11', role: 'User', status: 'a', action: null },
    { id: 34, name: 'Daniel Carter', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-12', role: 'Admin', status: 'a', action: null },
    { id: 35, name: 'Sofia Thompson', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-13', role: 'User', status: 'a', action: null },
    { id: 36, name: 'David Lee', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-14', role: 'Admin', status: 'a', action: null },
    { id: 37, name: 'Lily Walker', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-15', role: 'User', status: 'a', action: null },
    { id: 38, name: 'Owen Wright', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-16', role: 'Admin', status: 'a', action: null },
    { id: 39, name: 'Scarlett King', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-17', role: 'User', status: 'a', action: null },
    { id: 40, name: 'Jackson Scott', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-18', role: 'Admin', status: 'a', action: null },
    { id: 41, name: 'Maya Brown', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-19', role: 'User', status: 'a', action: null },
    { id: 42, name: 'Samuel Lee', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-20', role: 'Admin', status: 'a', action: null },
    { id: 43, name: 'Chloe Turner', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-21', role: 'User', status: 'a', action: null },
    { id: 44, name: 'Isaiah Hill', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-22', role: 'Admin', status: 'a', action: null },
    { id: 45, name: 'Sophia Martin', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-23', role: 'User', status: 'a', action: null },
    { id: 46, name: 'Levi Davis', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-24', role: 'Admin', status: 'a', action: null },
    { id: 47, name: 'Aiden Moore', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-25', role: 'User', status: 'a', action: null },
    { id: 48, name: 'Jackie Perez', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-26', role: 'Admin', status: 'a', action: null },
    { id: 49, name: 'Daniel Walker', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-27', role: 'User', status: 'a', action: null },
    { id: 50, name: 'Emma Rodriguez', avatar: 'https://robohash.org/RandomUser.png', created_at: '2021-11-28', role: 'Admin', status: 'a', action: null }
]
const formatOrDefault = (value, formatter) => {
    if (value == null) return '-'; // Handles null and undefined
    return formatter ? formatter(value) : value;
};
const columns = [
    {
        front_end_key: 'id',
        back_end_key: 'id',
        name: 'ID',
        format: formatOrDefault
    },
    {
        front_end_key: 'name',
        back_end_key: 'name',
        name: 'Name',
        format: (value) => formatOrDefault(value, (v) => v.toLowerCase())
    },
    {
        front_end_key: 'email',
        back_end_key: 'email',
        name: 'Email',
        format: formatOrDefault
    },
    {
        front_end_key: 'created_at',
        back_end_key: 'date_created',
        name: 'Date Created',
        format: formatOrDefault
    },
    {
        front_end_key: 'role',
        back_end_key: 'role',
        name: 'Role',
        format: formatOrDefault
    },
    {
        front_end_key: 'status',
        back_end_key: 'status',
        name: 'Status',
        format: (value) => formatOrDefault(value, (v) => {
            const statusData = status.getByValue(v);
            return (
                <div>
                    <span
                        style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: statusData?.bg_color || 'gray'
                        }}>
                    </span>
                    {statusData?.label || '-'}
                </div>
            );
        })
    },
    {
        front_end_key: 'action',
        back_end_key: 'action',
        name: 'Action',
        format: formatOrDefault
    }
];
const stickyColumns = ["id", "name"];

// STICKY HEADER & COLUMN STYLES || THEY CAN BE MOVED TO A SEPARATE HELPER FILES
// Function to get sticky header styles
const getStickyHeaderStyles = () => ({
    backgroundColor: "#fff", // White header
    color: "#000", // Black text
    position: "sticky",
    top: 0,
    zIndex: 11
});
// Function to get sticky column styles
const getStickyColumnStyles = (columnKey, index, isHeader = false) => {
    if (!stickyColumns.includes(columnKey)) return {}; // Return empty if not sticky

    return {
        backgroundColor: "#fff",
        color: "#000", //
        position: "sticky",
        left: `${index * 50}px`, // Adjust column width
        zIndex: isHeader ? 12 : 10 // Ensure header is above sticky columns
    };
};

export default function DemoSimple() {
    // DATA FETCHING || TABLE DATA
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true); // Loader for data fetching
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setRows(rows_data);
            setLoading(false);
        }, 2000); // Simulating 2-second delay
    }, []);

    // PAGINATION
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    // DELETE USER MODAL
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false); // Loader state
    // Open delete confirmation modal
    const openDeleteModal = (row) => {
        setSelectedRow(row);
        setModalOpen(true);
    };
    // Close modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedRow(null);
        setIsDeleting(false); // Reset loader
    };
    // Handle row deletion with a simulated delay for loader
    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            if (selectedRow) {
                setRows((prevRows) => prevRows.filter((r) => r.id !== selectedRow.id));
            }
            closeModal();
        }, 1500); // Simulating API delay
    };

    // CREATE NEW USER MODAL
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", status: "a" });
    const [isCreating, setIsCreating] = useState(false);
    const [errors, setErrors] = useState({});

    const openCreateModal = () => {
        setNewUser({ name: "", email: "", role: "User", status: "a" });
        setErrors({});
        setCreateModalOpen(true);
    };

    const validateForm = () => {
        let newErrors = {};
        if (!newUser.name.trim()) newErrors.name = "Name is required";
        if (!newUser.email.trim() || !/^\S+@\S+\.\S+$/.test(newUser.email))
            newErrors.email = "Valid email is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateUser = () => {
        if (!validateForm()) return;
        setIsCreating(true);

        setTimeout(() => {
            const newUserData = {
                id: rows.length + 1,
                name: newUser.name,
                email: newUser.email,
                created_at: new Date().toISOString().split('T')[0],
                role: newUser.role,
                status: newUser.status
            };
            setRows((prevRows) => [newUserData, ...prevRows]);
            setCreateModalOpen(false);
            setIsCreating(false);
        }, 1500);
    };


    return (
        <>
            <div className="report-page">
                <div className="table-toolbar">
                    <Button variant="contained" size="medium" onClick={openCreateModal}>
                        Create new user
                    </Button>
                    <Button variant="outlined" className="btn btn-outlined" disabled startIcon={<ContentCopyIcon/>}>
                        Duplicate
                    </Button>
                    <Button variant="outlined" className="btn btn-outlined" disabled startIcon={<DeleteIcon/>}>
                        Delete
                    </Button>
                    <Button variant="outlined" className="btn btn-outlined btn-outlined--export" startIcon={<FileDownloadIcon/>}>
                        Export
                    </Button>
                </div>
                <div className="table">
                    {!loading && (
                        <TableContainer component={Paper} className="table-container" sx={{ maxHeight: "75vh" }}>
                            <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, index) => {
                                            return (
                                                <TableCell
                                                    key={column.front_end_key}
                                                    sx={{
                                                        ...getStickyHeaderStyles(),
                                                        ...getStickyColumnStyles(column.front_end_key, index, true)
                                                    }}
                                                >
                                                    {column.name}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedRows.map((row) => {
                                        return (
                                            <TableRow key={row.id}>
                                                {columns.map((column, index) => {
                                                    const value = row[column.front_end_key]
                                                    return (
                                                        <TableCell
                                                            key={column.front_end_key}
                                                            component="th"
                                                            scope="row"
                                                            sx={getStickyColumnStyles(column.front_end_key, index)}
                                                        >
                                                            {
                                                                column.front_end_key === 'action' ? (
                                                                    <div>
                                                                        <IconButton aria-label="more">
                                                                            <MoreHorizIcon/>
                                                                        </IconButton>
                                                                        <IconButton
                                                                            aria-label="delete"
                                                                            onClick={() => openDeleteModal(row)}
                                                                        >
                                                                            <DeleteIcon/>
                                                                        </IconButton>
                                                                    </div>
                                                                ) : column.front_end_key === 'name' ? (
                                                                    <div className="avatar_wrapper">
                                                                        <img className="avatar" src={row.avatar} alt="avatar"/>
                                                                        <span>{value}</span>
                                                                    </div>
                                                                ) : (column.format ? column.format(value) : value)
                                                            }
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <TableSkeleton loading={loading} rowsPerPage={6} columns={10} />
                </div>
                <div className="pagination">
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        showFirstButton showLastButton
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>
            {/* Delete User Modal */}
            <Modal
                open={modalOpen}
                onClose={closeModal}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete <strong>{selectedRow?.name}</strong>?</p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Button onClick={handleDelete} variant="contained" color="error" sx={{ marginRight: 1 }}>
                        Delete
                    </Button>
                    <Button onClick={closeModal} variant="contained" color="secondary" disabled={isDeleting}>
                        Cancel
                    </Button>
                </div>
                <OverlayLoader loading={isDeleting} size={80} color="secondary" />
            </Modal>
            {/* Create User Modal */}
            <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New User">
                <TextField
                    fullWidth
                    label="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    fullWidth
                    label="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    select
                    fullWidth
                    label="Role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                    {roles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                </TextField>
                <Button onClick={handleCreateUser} variant="contained" disabled={isCreating}>Create</Button>
                <OverlayLoader loading={isCreating} />
            </Modal>
        </>
    );
}
