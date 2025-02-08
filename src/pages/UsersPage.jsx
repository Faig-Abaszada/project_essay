import "../assets/styles/pages/usersPage.scss";
import React, {useState, useEffect} from "react";
import TableComponent from "../components/Table/TableComponent.jsx";
import DeleteModal from "../components/Modals/DeleteModal.jsx";
import CreateUserModal from "../components/Modals/CreateUserModal.jsx";
import TablePagination from "../components/Table/TablePagination.jsx";
import TableToolbar from "../components/Table/TableToolbar.jsx";
import {fetchMockData} from "../helpers/dataHelpers";

export default function UsersPage() {
    // State management
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    // Fetch data from mock API
    useEffect(() => {
        setLoading(true);
        fetchMockData().then((data) => {
            setRows(data);
            setLoading(false);
        });
    }, []);

    // Delete modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteModal = (row) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedRow(null);
        setIsDeleting(false);
    };

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            if (selectedRow) {
                setRows((prevRows) => prevRows.filter((r) => r.id !== selectedRow.id));
            }
            closeModal();
        }, 1500);
    };

    // Create user modal state
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const handleAddUser = (newUser) => {
        setRows((prevRows) => [newUser, ...prevRows]);
    };

    return (
        <div className="users-page">
            <TableToolbar onCreate={openCreateModal}/>
            <TableComponent rows={rows} loading={loading} paginatedRows={paginatedRows}
                            openDeleteModal={openDeleteModal}/>
            <TablePagination count={Math.ceil(rows.length / rowsPerPage)} page={page}
                             onChange={(e, newPage) => setPage(newPage)}/>
            <DeleteModal open={modalOpen} onClose={closeModal} onDelete={handleDelete} selectedRow={selectedRow}
                         isDeleting={isDeleting}/>
            <CreateUserModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} addUser={handleAddUser}/>
        </div>
    );
}
