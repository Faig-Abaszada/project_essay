import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "../../assets/styles/components/tableSkeleton.scss";

export default function TableSkeleton({ loading, rowsPerPage, columns }) {
    if (!loading) return null;

    return (
        <div className="skeleton-overlay">
            {Array.from(new Array(rowsPerPage)).map((_, rowIndex) => (
                <div key={rowIndex}  className="row-skeleton">
                    {Array.from(new Array(columns)).map((_, colIndex) => (
                        <Skeleton key={colIndex} variant="rounded" width="100%" height={40} className="skeleton-item" />
                    ))}
                </div>
            ))}
        </div>
    );
}
