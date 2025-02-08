import React, { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import Modal from "../Modal";
import OverlayLoader from "../OverlayLoader";
import { roles } from "../../constants/roles";

export default function CreateUserModal({ open, onClose, addUser }) {
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", status: "a" });
    const [isCreating, setIsCreating] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!newUser.name.trim()) newErrors.name = "Name is required";
        if (!newUser.email.trim() || !/^\S+@\S+\.\S+$/.test(newUser.email)) {
            newErrors.email = "Valid email is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateUser = () => {
        if (!validateForm()) return;
        setIsCreating(true);

        setTimeout(() => {
            addUser({
                id: Date.now(),
                name: newUser.name,
                email: newUser.email,
                created_at: new Date().toISOString().split('T')[0],
                role: newUser.role,
                status: newUser.status
            });
            setNewUser({ name: "", email: "", role: "User", status: "a" });
            setIsCreating(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal open={open} onClose={onClose} title="Create New User">
            <TextField
                fullWidth
                label="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                fullWidth
                label="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                select
                fullWidth
                label="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                sx={{ marginBottom: 2 }}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </TextField>
            <Button onClick={handleCreateUser} variant="contained" disabled={isCreating} sx={{ marginTop: 2 }}>
                Create
            </Button>
            <OverlayLoader loading={isCreating} />
        </Modal>
    );
}
