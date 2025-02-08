import React from "react";
import {Button} from "@mui/material";
import Modal from "../Modal";
import OverlayLoader from "../OverlayLoader";

export default function DeleteModal({open, onClose, onDelete, selectedRow, isDeleting}) {
    return (
        <Modal open={open} onClose={onClose} title="Confirm Delete">
            <p>
                Are you sure you want to delete <strong>{selectedRow?.name}</strong>?
            </p>
            <div style={{display: "flex", justifyContent: "flex-end", marginTop: "20px"}}>
                <Button onClick={onDelete} variant="contained" color="error" sx={{marginRight: 1}}>
                    Delete
                </Button>
                <Button onClick={onClose} variant="outlined" disabled={isDeleting}>
                    Cancel
                </Button>
            </div>
            <OverlayLoader loading={isDeleting} size={80}/>
        </Modal>
    );
}
