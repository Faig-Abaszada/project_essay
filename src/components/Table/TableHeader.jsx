import React from "react";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { getStickyHeaderStyles, getStickyColumnStyles } from "../../helpers/tableHelpers";
import { stickyColumns } from "../../constants/columns.jsx";

export default function TableHeader({ columns }) {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                        key={column.front_end_key}
                        sx={{
                            ...getStickyHeaderStyles(),
                            ...getStickyColumnStyles(column.front_end_key, index, stickyColumns, true)
                        }}
                    >
                        {column.name}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
