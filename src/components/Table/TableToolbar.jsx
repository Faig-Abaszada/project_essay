import "../../assets/styles/components/tableToolbar.scss";
import React from "react";
import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function TableToolbar({ onCreate, onDelete }) {
    return (
        <div className="table-toolbar">
            <Button variant="contained" size="medium" onClick={onCreate}>
                Create new user
            </Button>
            <Button variant="outlined" disabled startIcon={<ContentCopyIcon />}>
                Duplicate
            </Button>
            <Button variant="outlined" disabled startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Button variant="outlined" className="btn btn-outlined--export" startIcon={<FileDownloadIcon />}>
                Export
            </Button>
        </div>
    );
}
