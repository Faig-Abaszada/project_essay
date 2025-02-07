import React from "react";
import {
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
    Paper,
} from "@mui/material";

// Define which columns should be sticky (DYNAMIC)
const stickyColumns = ["name", "calories", "fat"]; // Change this array dynamically

const App = () => {
    let id = 0;
    function createData(name, calories, fat, carbs, protein) {
        id += 1;
        return { id, name, calories, fat, carbs, protein };
    }

    const data = [
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
    ];

    // Table Column Definitions
    const columns = [
        { id: "name", label: "Dessert (100g serving)" },
        { id: "calories", label: "Calories" },
        { id: "fat", label: "Fat (g)" },
        { id: "carbs", label: "Carbs (g)" },
        { id: "protein", label: "Protein (g)" },
    ];

    return (
        <div>
            <h3>Dynamic Sticky Header + Columns</h3>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                        fontWeight: "bold",
                                        position: stickyColumns.includes(column.id) ? "sticky" : "static",
                                        left: stickyColumns.includes(column.id) ? `${index * 120}px` : "auto",
                                        zIndex: stickyColumns.includes(column.id) ? 1500 : "auto",
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        sx={{
                                            position: stickyColumns.includes(column.id) ? "sticky" : "static",
                                            left: stickyColumns.includes(column.id) ? `${index * 120}px` : "auto",
                                            backgroundColor: stickyColumns.includes(column.id) ? "#f5f5f5" : "inherit",
                                            fontWeight: stickyColumns.includes(column.id) ? "bold" : "normal",
                                            zIndex: stickyColumns.includes(column.id) ? 1400 : "auto",
                                        }}
                                    >
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default App;
