import "../../assets/styles/components/tableBody.scss";
import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { getStickyColumnStyles } from "../../helpers/tableHelpers";
import { stickyColumns } from "../../constants/columns.jsx";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { columns } from "../../constants/columns.jsx";

export default function TableBodyComponent({ rows, openDeleteModal }) {
    return (
        <tbody>
        {rows.map((row) => (
            <TableRow key={row.id}>
                {columns.map((column, index) => {
                    const value = row[column.front_end_key];

                    return (
                        <TableCell
                            key={column.front_end_key}
                            sx={getStickyColumnStyles(column.front_end_key, index, stickyColumns)}
                        >
                            {column.front_end_key === 'action' ? (
                                <div>
                                    <IconButton>
                                        <MoreHorizIcon />
                                    </IconButton>
                                    <IconButton onClick={() => openDeleteModal(row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ) : column.front_end_key === 'name' ? (
                                <div className="avatar_wrapper">
                                    <img className="avatar" src={row.avatar} alt="avatar"/>
                                    <span>{value}</span>
                                </div>
                            ) : (
                                column.format ? column.format(value) : value
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        ))}
        </tbody>
    );
}
