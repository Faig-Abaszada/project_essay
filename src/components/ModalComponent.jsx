import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/styles/components/modalComponent.scss";

// Reusable Modal Component
const ModalComponent = ({ open, onClose, title, children }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
            <Box className="modal-box">
                <div className="modal-header">
                    <Typography id="modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton className="modal-close-btn" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <Box>{children}</Box>
            </Box>
        </Modal>
    );
};
export default ModalComponent;
