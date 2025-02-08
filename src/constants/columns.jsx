import React from "react";
import {formatOrDefault} from "../helpers/tableHelpers";
import {status} from "../helpers/statusHelpers";

export const columns = [
    {
        front_end_key: "id",
        back_end_key: "id",
        name: "ID",
        format: formatOrDefault,
        // Full control of column visibility, sorting, filtering, etc.
        sortable: true, // Control of sorting
        deletable: true, // Control of checked or unchecked at filters to filter columns
        default: true,  // Control of initially shown columns before applying filters
        visible: true, // Control of visibility of columns | maybe f.e some users can't see some columns
        style: "" // Custom styles for column
    },
    {
        front_end_key: "name",
        back_end_key: "name",
        name: "Name",
        format: (value) => formatOrDefault(value, (v) => v.toLowerCase())
    },
    {
        front_end_key: "email",
        back_end_key: "email",
        name: "Email",
        format: formatOrDefault
    },
    {
        front_end_key: "created_at",
        back_end_key: "date_created",
        name: "Date Created",
        format: formatOrDefault
    },
    {
        front_end_key: "role",
        back_end_key: "role",
        name: "Role",
        format: formatOrDefault
    },
    {
        front_end_key: "status",
        back_end_key: "status",
        name: "Status",
        format: (value) => {
            if (!value) return "-"; // Handles null/undefined values
            const statusData = status.getByValue(value);
            if (!statusData) return "-";

            return (
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                    <span
                        style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: statusData.bg_color || "gray",
                        }}
                    />
                    {statusData.label}
                </div>
            );
        },
    },
    {
        front_end_key: "action",
        back_end_key: "action",
        name: "Action",
        format: formatOrDefault
    },
];

export const stickyColumns = ["id", "name"];
